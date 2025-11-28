"use client";

import { useEffect, useRef, useState, memo } from "react";

const ParticlesBackground = memo(() => {
  const canvasRef = useRef(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    // Detect mobile and low-performance devices
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isLowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsMobile(mobile);

    // Check if device is low performance
    if (prefersReducedMotion) {
      setIsLowPerformance(true);
      return; // Don't render particles at all
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true, // Better performance
      willReadFrequently: false, // Optimize for write operations
    });
    if (!ctx) return;

    let frameCount = 0;
    const particles = particlesRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Smaller particles on mobile for better performance
        this.size = mobile ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1;

        // Colors: Ash grey, white, and subtle red
        const colors = ["#888888", "#cccccc", "#ff0909"];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Slower movement on mobile
        const speedMultiplier = mobile ? 0.6 : 1;
        this.speedX = (Math.random() * 1 - 0.5) * speedMultiplier;
        this.speedY = (Math.random() * 1 + 0.5) * speedMultiplier;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if out of bounds
        if (this.y > canvas.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      // Adaptive particle count based on device and screen size
      let particleCount = 80; // Desktop default (reduced from 100)

      if (mobile) {
        // Even fewer particles on very small screens
        particleCount = window.innerWidth < 400 ? 10 : 20;
      } else if (isLowEnd) {
        particleCount = 40; // Reduce for low-end desktops
      }

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const animate = () => {
      frameCount++;

      // On mobile, run at 30fps instead of 60fps for better performance
      if (mobile && frameCount % 2 !== 0) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Use more efficient clearing method
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch rendering for better performance
      ctx.save();
      const particleList = particlesRef.current;
      const len = particleList.length;
      for (let i = 0; i < len; i++) {
        particleList[i].update();
        particleList[i].draw();
      }
      ctx.restore();

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Throttle resize on mobile
    let resizeTimeout;
    const handleResize = () => {
      if (mobile) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          resizeCanvas();
          initParticles(); // Reinitialize particles after resize
        }, 250);
      } else {
        resizeCanvas();
        initParticles();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (resizeTimeout) clearTimeout(resizeTimeout);
      particlesRef.current = [];
    };
  }, [isMobile]);

  // Don't render canvas if reduced motion is preferred
  if (isLowPerformance) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      style={{ willChange: "contents" }}
    />
  );
});

ParticlesBackground.displayName = "ParticlesBackground";

export default ParticlesBackground;

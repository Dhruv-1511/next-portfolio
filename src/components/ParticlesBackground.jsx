"use client";

import { useEffect, useRef, useState } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let frameCount = 0;

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
      particles = [];
      // Adaptive particle count based on device and screen size
      let particleCount = 100; // Desktop default

      if (mobile) {
        // Even fewer particles on very small screens
        particleCount = window.innerWidth < 400 ? 15 : 25;
      } else if (isLowEnd) {
        particleCount = 50; // Reduce for low-end desktops
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      frameCount++;

      // On mobile, run at 30fps instead of 60fps for better performance
      if (mobile && frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Use more efficient clearing method
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch rendering for better performance
      ctx.save();
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Throttle resize on mobile
    let resizeTimeout;
    const handleResize = () => {
      if (mobile) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 200);
      } else {
        resizeCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
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
    />
  );
};

export default ParticlesBackground;

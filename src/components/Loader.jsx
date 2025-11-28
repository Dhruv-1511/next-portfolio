"use client";

import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import bg1 from "../assets/bg3.webp";
import ParticlesBackground from "./ParticlesBackground";

const Loader = memo(({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for performance optimization
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 overflow-hidden"
      style={{
        backgroundImage: `url(${bg1.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Fog/Glow (behind particles) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a0000_0%,_#000000_100%)] opacity-70 -z-10" />

      {/* Particles background - disabled on mobile for performance */}
      {!isMobile && <ParticlesBackground />}

      {/* Title Container with Fire Effect */}
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: isMobile ? 1 : 2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Flame glow behind text - simplified on mobile */}
        <motion.div
          className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-t from-red-900/40 via-red-600/20 to-transparent blur-3xl"
          initial={{ opacity: 0.4 }}
          animate={
            isMobile
              ? { opacity: 0.5 }
              : { opacity: [0.3, 0.8, 0.4], scale: [1, 1.05, 1] }
          }
          transition={{
            duration: 3,
            repeat: isMobile ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Title - reduced animations on mobile */}
        <motion.h1
          className="font-serif text-[54px] sm:text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 stroke-red-500 tracking-widest uppercase mt-[-10px] md:mt-[-20px] drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
          style={{ WebkitTextStroke: "2px #ff0909" }}
          animate={isMobile ? {} : { y: [0, -1, 1, 0] }}
          transition={{
            duration: 1.4,
            repeat: isMobile ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          DHRUV'S
        </motion.h1>
        <motion.h1
          className="font-serif text-[54px] sm:text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 stroke-red-500 tracking-widest uppercase mt-[-10px] md:mt-[-20px] drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
          style={{ WebkitTextStroke: "2px #ff0909" }}
          animate={isMobile ? {} : { y: [0, 1, -1, 0] }}
          transition={{
            duration: 1.6,
            repeat: isMobile ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          PORTFOLIO
        </motion.h1>

        {/* Loading Bar */}
        <div className="mt-12 w-64 h-1 bg-gray-900 rounded-full overflow-hidden border border-red-900/50">
          <motion.div
            className="h-full bg-red-600 shadow-[0_0_10px_#ff0000]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
});

Loader.displayName = "Loader";

export default Loader;

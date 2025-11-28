/**
 * Performance utilities for mobile optimization
 */

export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  return navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
};

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getOptimizedAnimationConfig = () => {
  const mobile = isMobileDevice();
  const lowEnd = isLowEndDevice();
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      shouldAnimate: false,
      duration: 0,
      iterations: 0,
    };
  }

  if (mobile || lowEnd) {
    return {
      shouldAnimate: true,
      duration: 0.5, // Faster animations
      iterations: 0, // No infinite loops
    };
  }

  return {
    shouldAnimate: true,
    duration: 1,
    iterations: Infinity,
  };
};

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxShapes = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: ySlow }}
        className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-brand-500/60 via-indigo-500/40 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: yFast, rotate }}
        className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-gradient-to-tr from-sky-500/30 via-fuchsia-500/30 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: ySlow }}
        className="absolute inset-x-2/4 bottom-0 h-64 w-96 -translate-x-1/2 rounded-3xl bg-white/5 blur-2xl"
      />
    </div>
  );
};

export default ParallaxShapes;

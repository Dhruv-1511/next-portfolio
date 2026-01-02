import { motion } from "framer-motion";
import { memo } from "react";

const SectionHeading = memo(({ eyebrow, title, subtitle }) => (
  <div className="relative mb-20 flex flex-col items-center justify-center text-center">
    {/* Eyebrow - Tech Chip */}
    {eyebrow && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-6"
      >
        <div className="relative px-4 py-1 bg-black/40 border border-red-900/50 backdrop-blur-sm rounded-full flex items-center gap-3">
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              times: [0, 0.49, 0.5, 1],
              ease: "linear",
            }}
            className="text-red-500 font-bold"
          >
            &gt;&gt;
          </motion.span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-red-500"
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400">
            {eyebrow}
          </span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-red-500"
          />
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              times: [0, 0.49, 0.5, 1],
              ease: "linear",
            }}
            className="text-red-500 font-bold"
          >
            &lt;&lt;
          </motion.span>
        </div>
      </motion.div>
    )}

    {/* Title Container */}
    <div className="relative z-10 flex items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto px-4">
      {/* Left Bracket */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        className="text-3xl md:text-7xl text-red-800/40 font-thin font-mono hidden sm:inline-block select-none"
      >
        {"{"}
      </motion.span>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] leading-tight pb-2"
      >
        {title}
      </motion.h2>

      {/* Right Bracket */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        className="text-3xl md:text-7xl text-red-800/40 font-thin font-mono hidden sm:inline-block select-none"
      >
        {"}"}
      </motion.span>
    </div>

    {/* Bottom Decoration */}
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: "300px", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent mt-8 relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-red-600/20 blur-[2px]" />
    </motion.div>
  </div>
));

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;

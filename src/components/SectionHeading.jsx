import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    className="mb-12 space-y-4 text-center md:mb-16 relative"
  >
    {eyebrow && (
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-marvel-red blur-md opacity-20" />
          <p className="relative border-l-4 border-marvel-red bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.4em] text-marvel-red font-oswald">
            FILE: {eyebrow}
          </p>
        </div>
      </div>
    )}
    <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl font-marvel drop-shadow-[0_2px_10px_rgba(236,29,36,0.5)]">
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl font-oswald tracking-wide">
        {subtitle}
      </p>
    )}

    {/* Decorative Line */}
    <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-marvel-red to-transparent opacity-50" />
  </motion.div>
);

export default SectionHeading;

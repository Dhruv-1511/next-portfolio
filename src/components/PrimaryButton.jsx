import { motion } from "framer-motion";
import { memo } from "react";
import clsx from "clsx";

const variants = {
  primary:
    "bg-red-900/80 text-white shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:bg-red-600 border border-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.8)]",
  secondary:
    "border border-red-500 text-red-500 hover:bg-red-900/20 shadow-[0_0_10px_rgba(255,0,0,0.3)]",
};

const PrimaryButton = memo(
  ({ href = "#", label, variant = "primary", icon: Icon, download }) => (
    <motion.a
      href={href}
      download={download}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] transition-all font-serif clip-path-slant",
        variants[variant]
      )}
      style={{
        clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)",
        willChange: "transform",
      }}
    >
      {label}
      {Icon ? <Icon size={18} /> : null}
    </motion.a>
  )
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;

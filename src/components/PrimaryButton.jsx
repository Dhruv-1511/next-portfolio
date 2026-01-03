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
      className="relative group inline-flex items-center justify-center"
    >
      {/* Outer Border Layer */}
      <div
        className="absolute inset-0 bg-red-600"
        style={{
          clipPath:
            "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
        }}
      />

      {/* Inner Content Layer */}
      <div
        className={clsx(
          "flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-[0.25em] transition-all font-serif relative m-[1px]",
          variant === "primary"
            ? "bg-red-900/80 text-white"
            : "bg-black text-red-500"
        )}
        style={{
          clipPath:
            "polygon(calc(15px - 0.5px) 0, 100% 0, 100% calc(100% - 15px + 0.5px), calc(100% - 15px + 0.5px) 100%, 0 100%, 0 calc(15px - 0.5px))",
          width: "calc(100% - 2px)",
          height: "calc(100% - 2px)",
        }}
      >
        {label}
        {Icon ? <Icon size={18} /> : null}
      </div>
    </motion.a>
  )
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FiArrowUpRight, FiX } from "react-icons/fi";

const ExpandableCard = ({ project, index, expanded, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = expanded === index;

  // Handle ESC key to close dialog
  useEffect(() => {
    if (!isExpanded) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onExpand(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isExpanded, onExpand]);

  return (
    <>
      {/* Card in Grid */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        className={clsx(
          "group relative aspect-square w-full cursor-pointer overflow-hidden rounded-3xl border border-brand-500/20 bg-black/40 shadow-glow-red",
          isExpanded && "opacity-0 pointer-events-none"
        )}
        onClick={() => onExpand(index)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.logo || project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient Overlay - Changes on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40"
          animate={isHovered ? { opacity: 0.85 } : { opacity: 0.6 }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 9, 9, 0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 9, 9, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          animate={
            isHovered
              ? { opacity: 0.4, scale: 1.05 }
              : { opacity: 0.1, scale: 1 }
          }
          transition={{ duration: 0.6 }}
        />

        {/* Project Number - Always Visible */}
        <motion.div
          className="absolute left-6 top-6 z-10"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-brand-500/50 bg-black/90 backdrop-blur-xl shadow-glow-red">
            <span className="text-2xl font-bold text-brand-300 ">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Hover Information Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-8"
          initial={false}
          animate={{
            backdropFilter: isHovered ? "blur(0px)" : "blur(0px)",
          }}
        >
          {/* Content Container */}
          <motion.div
            className="relative"
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background for Content */}
            <motion.div
              className="absolute inset-0 -inset-x-8 -inset-y-8 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(255,9,9,0.18),_transparent_55%)] bg-black/80 backdrop-blur-xl border border-brand-500/30"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.95,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Title */}
              <motion.h3
                className="mb-2 text-3xl font-bold leading-tight text-white md:text-4xl font-marvel drop-shadow-[0_2px_10px_rgba(255,9,9,0.7)]"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0.9,
                }}
                transition={{ delay: isHovered ? 0.15 : 0 }}
              >
                <span className="bg-gradient-to-r from-white via-brand-300 to-brand-500 bg-clip-text text-transparent">
                  {project.title}
                </span>
              </motion.h3>

              {/* Click Hint */}
              <motion.div
                className="flex items-center gap-2 text-sm text-slate-200 font-oswald tracking-[0.25em] uppercase"
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                }}
              >
                <span>Open mission file</span>
                <FiArrowUpRight className="text-brand-300" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Accent Line - Animated */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
        />

        {/* Corner Glow Effect */}
        <motion.div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/40 via-brand-400/20 to-transparent blur-3xl"
          animate={
            isHovered
              ? { scale: 1.3, opacity: 0.6 }
              : { scale: 1, opacity: 0.3 }
          }
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Dialog Overlay - Rendered via Portal to document.body */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence mode="wait">
            {isExpanded && (
              <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                  onClick={() => onExpand(null)}
                />

                {/* Dialog Content - Properly centered */}
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`dialog-title-${index}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="relative z-[80] w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-black/95 via-black/90 to-slate-950/95 shadow-glow-red backdrop-blur-2xl md:max-w-6xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={() => onExpand(null)}
                    className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-xl text-white transition-all hover:border-brand-500/50 hover:bg-brand-500/20"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX size={24} />
                  </motion.button>

                  {/* Scrollable Content */}
                  <div className="h-full max-h-[85vh] overflow-y-auto">
                    {/* Hero Image Section */}
                    <div className="relative h-[500px] overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${
                            project.image || project.logo
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                      {/* Project Number */}
                      <motion.div
                        className="absolute left-8 top-8"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-brand-500/70 bg-black/90 backdrop-blur-xl shadow-glow-red">
                          <span className="text-3xl font-bold text-brand-300 font-serif">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </motion.div>

                      {/* Logo */}
                      {project.logo && (
                        <motion.div
                          className="absolute right-8 top-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-slate-950/80 p-3 shadow-2xl backdrop-blur-xl">
                            <img
                              src={project.logo}
                              alt={`${project.title} logo`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 bg-gradient-to-b from-black/80 via-slate-950/95 to-black">
                      {/* Category Badge */}
                      <motion.div
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/15 px-4 py-1.5 shadow-glow-red"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="h-2 w-2 rounded-full bg-brand-400" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-300 font-oswald">
                          Featured Mission
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h2
                        id={`dialog-title-${index}`}
                        className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl font-marvel drop-shadow-[0_3px_16px_rgba(255,9,9,0.8)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="bg-gradient-to-r from-white via-brand-300 to-brand-500 bg-clip-text text-transparent">
                          {project.title}
                        </span>
                      </motion.h2>

                      <motion.div
                        className="flex flex-wrap items-center gap-4 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn flex items-center gap-3 rounded-xl bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-glow-red transition-all hover:shadow-2xl"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>View Live Mission</span>
                          <FiArrowUpRight size={20} />
                        </motion.a>
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        className="mb-8 text-lg leading-relaxed text-slate-200 font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {project.description}
                      </motion.p>

                      {/* Tech Stack */}
                      <motion.div
                        className=""
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {project.stack.map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              className="rounded-lg border border-brand-500/40 bg-gradient-to-r from-black/70 via-slate-900/80 to-black/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-100 backdrop-blur-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + tagIndex * 0.05 }}
                              whileHover={{
                                scale: 1.05,
                                borderColor: "rgba(99, 102, 241, 0.5)",
                                color: "#a5b4fc",
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default ExpandableCard;

import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { useContentfulData } from "../context/ContentfulContext";

const Skills = () => {
  const { content } = useContentfulData();
  const { skills } = content;

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Core Skills"
          title="Technologies I master and love working with."
          subtitle="Building exceptional experiences with cutting-edge tools and proven methodologies."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <motion.div
                  className="card-3d glass-card2 relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-6 shadow-xl transition-all duration-500"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                    style={{
                      background: `radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent)`,
                    }}
                  />

                  {/* Content Layout */}
                  <div className="relative z-10 flex items-center gap-4">
                    {/* Icon */}
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ rotate: 0, scale: 1 }}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{
                        duration: 0.5,
                        rotate: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                        scale: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                    >
                      <div className="relative">
                        <div className="h-14 w-14 rounded-xl border border-white/10 bg-white/5 p-2.5 shadow-lg backdrop-blur-sm">
                          <img
                            src={skill.iconUrls}
                            alt={skill.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30"
                          style={{
                            background: `radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent)`,
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-white truncate">
                          {skill.name}
                        </h3>
                        <motion.span
                          className="flex-shrink-0 text-sm font-bold text-brand-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.06 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400 shadow-lg"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: 0.4 + index * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "linear",
                          }}
                          style={{ width: "50%" }}
                        />
                      </div>

                      {/* Level Badge */}
                      <div className="mt-3 flex items-center gap-2">
                        <motion.div
                          className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                          animate={{
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                          {skill.level >= 90
                            ? "Expert"
                            : skill.level >= 70
                            ? "Advanced"
                            : "Intermediate"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  {/* <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  /> */}

                  {/* Corner accent */}
                  <motion.div
                    className="absolute right-0 top-0 h-16 w-16 origin-top-right"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: -45 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.06,
                    }}
                  >
                    <div className="h-full w-full bg-gradient-to-br from-brand-500/20 to-transparent opacity-50" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative background elements */}
        {/* <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: "rgba(99, 102, 241, 0.4)" }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-8"
            style={{ background: "rgba(14, 165, 233, 0.4)" }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -15, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div> */}
      </div>
    </section>
  );
};

export default Skills;

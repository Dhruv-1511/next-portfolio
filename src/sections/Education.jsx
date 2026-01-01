import { motion } from "framer-motion";
import { FaAward, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "../components/SectionHeading";
import { useContentfulData } from "../context/ContentfulContext";

const Education = () => {
  const { content } = useContentfulData();
  const { education } = content;

  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 md:py-24">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation that shapes my approach."
          subtitle="Building expertise through structured learning and continuous growth."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="card-3d relative h-full overflow-hidden rounded-3xl border border-red-900/30 bg-gradient-to-br from-black via-zinc-950 to-red-950/30 p-8 shadow-2xl transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20"
                  style={{ background: "#ef4444" }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Top badge */}
                <div className="relative mb-6 flex items-start justify-between">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/20 shadow-lg group-hover:bg-red-900/30 group-hover:border-red-500 transition-colors duration-300"
                    whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaAward className="text-2xl text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  </motion.div>

                  <motion.div
                    className="rounded-full border border-red-900/50 bg-red-950/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400 group-hover:text-red-300 group-hover:border-red-500/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.duration}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {item.degree}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-red-400">
                      <FaMapMarkerAlt
                        className="h-4 w-4"
                        style={{ color: "#ef4444" }}
                      />
                      <span className="text-sm font-medium">
                        {item.institution}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="h-3.5 w-3.5" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm leading-relaxed text-red-200">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                  style={{
                    background: `linear-gradient(90deg, #dc2626, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* Hover glow effect */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    background: `radial-gradient(circle at center, rgba(220, 38, 38, 0.4), transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        {/* <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute right-0 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
            style={{ background: "rgba(99, 102, 241, 0.4)" }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-15"
            style={{ background: "rgba(14, 165, 233, 0.4)" }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 40, 0],
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

export default Education;

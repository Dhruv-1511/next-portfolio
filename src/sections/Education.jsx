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

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-full perspective-1000"
            >
              <div className="relative h-full overflow-hidden bg-black/80 border border-red-900/20 backdrop-blur-xl p-1 transition-all duration-500 group-hover:border-red-500/60 group-hover:shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                {/* Digital Noise Background (Optional Texture) */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                {/* Holographic Border System */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Expanding Lines */}
                  <span className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-6 flex flex-col h-full bg-gradient-to-b from-red-950/10 to-transparent">
                  <div className="flex justify-between items-start mb-6">
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                    >
                      <FaAward className="text-2xl text-red-500" />
                    </motion.div>
                    <div className="text-[10px] font-mono text-red-400/60 tracking-widest uppercase border border-red-900/30 px-2 py-1 bg-black/40">
                      ID: {index < 10 ? `0${index + 1}` : index + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-oswald mb-2 group-hover:text-red-400 transition-colors relative inline-block tracking-wide">
                    {item.degree}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-red-300/80 font-mono mb-4">
                    <FaMapMarkerAlt
                      className="animate-bounce"
                      style={{ animationDuration: "2s" }}
                    />
                    <span>{item.institution}</span>
                  </div>

                  <p className="text-sm text-red-200/80 leading-relaxed mb-6 flex-grow font-sans border-l-2 border-red-900/30 pl-4 group-hover:border-red-500/50 transition-colors">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-red-900/30 flex justify-between items-center text-xs font-mono text-red-500/70">
                    <span className="flex items-center gap-2 bg-red-950/20 px-2 py-1 rounded">
                      <FaCalendarAlt />
                      {item.duration}
                    </span>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-red-400 font-bold"
                    >
                      ● ACTIVE
                    </motion.span>
                  </div>
                </div>

                {/* Scanning Laser Effect - Framer Motion */}
                <motion.div
                  className="absolute left-0 right-0 h-12 bg-gradient-to-b from-red-500/0 via-red-500/10 to-red-500/0 pointer-events-none z-0"
                  initial={{ top: "-20%" }}
                  whileHover={{ top: "120%" }}
                  transition={{
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
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

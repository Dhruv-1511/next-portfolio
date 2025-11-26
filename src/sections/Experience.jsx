import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiBriefcase, FiMapPin } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { useContentfulData } from "../context/ContentfulContext";

const Experience = () => {
  const { content } = useContentfulData();
  const { experiences, personal } = content;
  const timelineRef = useRef(null);

  // All hooks must be called before any conditional returns
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.3"],
    layoutEffect: false,
  });

  const easedProgress = useSpring(scrollYProgress || 0, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });

  const indicatorOffset = useTransform(easedProgress, (value) => {
    const percentage = Math.min(Math.max(value || 0, 0), 1) * 100;
    return `calc(${percentage}% - 1.125rem)`;
  });

  // Now we can do conditional returns after all hooks
  if (!experiences || !personal || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Delivering momentum across agencies and product teams."
          subtitle="From design sprints to production launches, I translate ideas into interactive experiences that convert."
        />

        <div ref={timelineRef} className="relative">
          <div className="space-y-12">
            {experiences.map((item) => (
              <motion.article
                key={`${item.company}-${item.duration}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[2fr_1fr_4fr]"
              >
                <div className="w-full lg:max-w-sm">
                  <div className="flex flex-col items-start gap-y-3 text-sm font-light">
                    <time className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
                      {item.duration}
                    </time>
                    <div className="flex items-center gap-3">
                      {item.logoImage ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-lg backdrop-blur-sm">
                          <img
                            src={item.logoImage}
                            alt={`${item.company} logo`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : null}
                      <h2 className="font-serif text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {item.company}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2 text-slate-400">
                      {item.location && (
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      )}
                      {item.workMode && (
                        <div className="flex items-center gap-1.5">
                          <FiBriefcase className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="text-sm font-semibold text-slate-300">
                            {item.workMode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block" />

                <div className="relative w-full">
                  <div className="flex flex-col gap-6 text-sm leading-relaxed text-slate-300">
                    <header>
                      <h3 className="text-xl font-semibold text-white md:text-2xl">
                        {item.role}
                      </h3>
                    </header>
                    <section aria-label="Key achievements">
                      <ul className="flex list-none flex-col gap-4 text-slate-300/90">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="leading-relaxed">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </section>
                    {item.skills?.length ? (
                      <section aria-label="Technologies used">
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-slate-800/70 via-slate-900/60 to-transparent px-3 py-1 font-mono text-xs uppercase tracking-[0.35em] text-slate-200 shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Timeline Indicator - Only render when data is loaded */}
          {personal && experiences && experiences.length > 0 && (
            <div className="pointer-events-none absolute inset-y-9 left-[calc(32%_-_1rem)] hidden w-8 md:flex">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 left-1/2 hidden h-full w-1.5 -translate-x-1/2 rounded-full bg-slate-800/80 shadow-[inset_0_2px_4px_rgba(15,23,42,0.35)] md:block" />
                <motion.div
                  className="absolute inset-0 left-1/2 hidden h-full w-1.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-pink-500 via-indigo-500 to-sky-400 md:block"
                  style={{ scaleY: easedProgress }}
                />
                <motion.div
                  className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
                  style={{ top: indicatorOffset }}
                >
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white/40 bg-slate-900 shadow-lg shadow-indigo-900/30">
                    <img
                      src={personal.photo}
                      alt="Timeline avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;

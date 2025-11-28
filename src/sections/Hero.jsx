import { motion } from "framer-motion";
import { memo, useMemo, useCallback } from "react";
import { FaGithub, FaReact } from "react-icons/fa";
import { SiFramer, SiJavascript, SiTailwindcss } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import PrimaryButton from "../components/PrimaryButton";
import ProfileCard from "../components/ProfileCard";
import ScrambledText from "../components/ScrambledText";
import { useContentfulData } from "../context/ContentfulContext";

const floatingIcons = [
  { icon: FaReact, color: "text-red-500", delay: 0 },
  { icon: RiNextjsFill, color: "text-white", delay: 0.1 },
  { icon: SiTailwindcss, color: "text-blue-500", delay: 0.3 },
  { icon: SiFramer, color: "text-red-400", delay: 0.5 },
  { icon: SiJavascript, color: "text-yellow-500", delay: 0.7 },
  { icon: FaGithub, color: "text-gray-400", delay: 0.9 },
];

const Hero = memo(() => {
  const { content } = useContentfulData();
  const { personal, heroCtas } = content;

  const greeting = useMemo(
    () => (personal ? `I  AM  ${personal.name.toUpperCase()}` : ""),
    [personal]
  );

  const handleContactClick = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!personal || !heroCtas || heroCtas.length === 0) {
    return null;
  }

  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden pt-16"
    >
      {/* <ParallaxShapes /> */}

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-8 md:grid-cols-[1.1fr,0.9fr] items-center justify-center">
        <div className="relative flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex w-fit items-center gap-2 border-l-4 border-red-600 bg-red-900/10 px-5 py-2"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-red-400 font-mono">
              Frontend Developer // SUBJECT 011
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-5xl font-serif font-bold leading-none tracking-tighter text-white sm:text-7xl md:text-8xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
              style={{ textShadow: "0 0 10px rgba(255, 9, 9, 0.5)" }}
            >
              <ScrambledText
                text={greeting}
                duration={1000}
                className="whitespace-pre-wrap text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 stroke-red-500"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="max-w-xl text-lg text-slate-300 font-sans tracking-wide border-l-2 border-red-800 pl-4"
            >
              {personal.summary}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-xl font-bold text-red-600 font-stranger tracking-widest uppercase glitch"
              data-text={`${personal.role} // LEVEL 11 CLEARANCE`}
            >
              {personal.role} // LEVEL 11 CLEARANCE
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="flex flex-wrap items-center gap-4"
          >
            {heroCtas.map((cta) => (
              <PrimaryButton key={cta.label} {...cta} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="flex flex-wrap gap-6"
          >
            {personal.highlights.map((highlight) => (
              <motion.div
                key={highlight.label}
                className="neon-border bg-black/80 p-4 relative overflow-hidden group backdrop-blur-sm"
                whileHover={{ y: -6 }}
              >
                <div className="absolute top-0 right-0 p-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-mono mb-1">
                  {highlight.label}
                </p>
                <p className="text-3xl font-bold text-white font-serif">
                  {highlight.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Hawkins Lab Style Profile Card Wrapper */}
          <div className="relative p-1 bg-gradient-to-br from-red-900 via-black to-red-900 rounded-2xl shadow-[0_0_30px_rgba(255,0,0,0.3)]">
            <div className="bg-black rounded-xl overflow-hidden">
              <ProfileCard
                name={personal.name}
                title={personal.role}
                handle="DhruvSheladiya"
                status="Online"
                contactText="CONTACT"
                avatarUrl={personal.photo}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={handleContactClick}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            {floatingIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={`absolute flex h-16 w-16 items-center justify-center rounded-full border border-red-900/50 bg-black/80 backdrop-blur-md text-3xl ${item.color} shadow-[0_0_15px_rgba(255,0,0,0.2)]`}
                  style={{
                    top: `${1 + index * 15}%`,
                    right: index % 2 === 0 ? "-12%" : "auto",
                    left: index % 2 !== 0 ? "-12%" : "auto",
                    willChange: "transform",
                  }}
                  initial={{ y: 0 }}
                  animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
                  transition={{
                    delay: item.delay,
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;

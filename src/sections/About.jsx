import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCode,
  FiZap,
  FiTarget,
  FiHeart,
  FiCoffee,
} from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { useContentfulData } from "../context/ContentfulContext";

const InteractivePhoto = memo(({ personal }) => {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (event) => {
      // Disable on mobile for performance
      if (isMobile) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;
      const normalizedX = mouseX / (rect.width / 2);
      const normalizedY = mouseY / (rect.height / 2);
      x.set(normalizedX);
      y.set(normalizedY);
    },
    [isMobile, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  }, [isMobile, x, y]);

  const photoStyle = useMemo(
    () =>
      isMobile
        ? {}
        : {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          },
    [isMobile, rotateX, rotateY]
  );

  if (!personal) return null;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={photoStyle}
    >
      <div className="relative overflow-hidden rounded-3xl border border-red-900/30 bg-black p-4 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
        {/* Photo Container */}
        <motion.div
          className="relative aspect-[13/15] overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={personal.redImg}
            alt={`${personal.name} portrait`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover sepia-[.4] hover:sepia-0 transition-all duration-500"
            style={{ willChange: isMobile ? "auto" : "transform" }}
            animate={isMobile ? {} : { scale: [1, 1.05, 1] }}
            transition={{
              duration: 8,
              repeat: isMobile ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-red-900/20 via-transparent to-black/40"
            animate={isMobile ? { opacity: 0.4 } : { opacity: [0.3, 0.5, 0.3] }}
            transition={{
              duration: 6,
              repeat: isMobile ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Decorative Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl border border-red-600/30"
          animate={
            isMobile
              ? {}
              : {
                  boxShadow: [
                    "0 0 20px rgba(255, 9, 9, 0.1)",
                    "0 0 40px rgba(255, 9, 9, 0.2)",
                    "0 0 20px rgba(255, 9, 9, 0.1)",
                  ],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
});

InteractivePhoto.displayName = "InteractivePhoto";

const StoryCard = memo(({ title, content, icon: Icon, index, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-red-900/20 bg-black/80 p-6 backdrop-blur-sm hover:border-red-600/50 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: gradient }}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-900/30 bg-red-900/10"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="text-xl text-red-500" />
          </motion.div>
          <p className="text-lg font-bold text-white font-serif">{title}</p>
        </div>
        <p className="text-sm leading-relaxed text-gray-400 font-mono">
          {content}
        </p>
      </div>

      {/* Corner Decoration */}
      <motion.div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: gradient }}
      />
    </motion.div>
  );
});

StoryCard.displayName = "StoryCard";

const About = memo(() => {
  const { content } = useContentfulData();
  const { personal } = content;

  const storyCards = useMemo(
    () =>
      personal
        ? [
            {
              title: "My Journey",
              content: personal.summary,
              icon: FiHeart,
              gradient: "linear-gradient(135deg, #ff4d4d, #ff0000)",
            },
            {
              title: "Design Philosophy",
              content:
                "Human-centered decisions, inclusive interactions, and purposeful visuals that make interfaces memorable and accessible.",
              icon: FiTarget,
              gradient: "linear-gradient(135deg, #ff4d4d, #ff0000)",
            },
            {
              title: "Motion & Animation",
              content:
                "Micro-interactions, tactile motion language, and cinematic storytelling that flows with intent and delight.",
              icon: FiZap,
              gradient: "linear-gradient(135deg, #ff4d4d, #ff0000)",
            },
            {
              title: "Code & Performance",
              content:
                "Ship resilient architectures, lighthouse-friendly experiences, and scalable code ecosystems that grow with teams.",
              icon: FiCode,
              gradient: "linear-gradient(135deg, #ff4d4d, #ff0000)",
            },
          ]
        : [],
    [personal]
  );

  if (!personal) {
    return null;
  }

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 md:py-24">
        <SectionHeading
          eyebrow="About Me"
          title="Building interfaces with clarity, craft, and rhythm."
          subtitle="Design-led development focusing on motion-rich storytelling, component scalability, and product velocity."
        />

        {/* Main Content - Split Layout */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          {/* Left Column - Photo & Quick Facts */}
          <div className="space-y-8">
            {/* Interactive Photo */}
            <InteractivePhoto personal={personal} />
          </div>

          {/* Right Column - Story Cards */}
          <div className="space-y-4">
            {storyCards.map((card, index) => (
              <StoryCard key={card.title} {...card} index={index} />
            ))}
          </div>
        </div>

        {/* Contact Section - Redesigned */}
        <motion.div
          className="mt-16 rounded-3xl border border-red-500/50 hover:border-red-500 transition-colors duration-300 bg-black/60 p-8 backdrop-blur-xl shadow-[0_0_20px_rgba(255,0,0,0.1)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-900/30 bg-red-900/10">
              <FiCoffee className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">
              Let's Connect
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <motion.a
              href={`mailto:${personal.contact.email}`}
              className="group relative overflow-hidden rounded-xl border border-red-800/50 bg-black/40 p-5 backdrop-blur-sm transition-all hover:border-red-500 hover:bg-red-900/10"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <FiMail className="text-red-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Email
                </p>
              </div>
              <p className="break-words text-sm font-semibold text-white font-mono">
                {personal.contact.email}
              </p>
            </motion.a>
            <motion.a
              href={`tel:${personal.contact.phone}`}
              className="group relative overflow-hidden rounded-xl border border-red-800/50 bg-black/40 p-5 backdrop-blur-sm transition-all hover:border-red-500 hover:bg-red-900/10"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <FiPhone className="text-red-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Phone
                </p>
              </div>
              <p className="text-sm font-semibold text-white font-mono">
                {personal.contact.phone}
              </p>
            </motion.a>
            <motion.div
              className="group relative overflow-hidden rounded-xl border border-red-800/50 bg-black/40 p-5 backdrop-blur-sm transition-all hover:border-red-500 hover:bg-red-900/10"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <FiMapPin className="text-red-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Location
                </p>
              </div>
              <p className="text-sm font-semibold text-white font-mono">
                {personal.contact.location}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute right-0 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{
              background: "rgba(255, 9, 9, 0.4)",
              willChange: "transform",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;

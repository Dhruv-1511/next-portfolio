import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTarget,
  FiHeart,
  FiZap,
  FiCpu,
  FiLock,
  FiUnlock,
  FiCheckCircle,
} from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { useContentfulData } from "../context/ContentfulContext";

// --- Components ---

const ScanlineOverlay = memo(() => (
  <div
    className="absolute inset-0 z-20 pointer-events-none opacity-20"
    style={{
      background:
        "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
      backgroundSize: "100% 4px",
    }}
  />
));

const HoloProfile = memo(({ personal, className }) => {
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

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (event) => {
      if (isMobile) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((event.clientX - centerX) / (rect.width / 2));
      y.set((event.clientY - centerY) / (rect.height / 2));
    },
    [isMobile, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!personal) return null;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-sm mx-auto lg:max-w-none ${
        className || ""
      }`}
      style={{
        perspective: 1000,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative z-10 p-2 bg-black/40 border border-red-900/40 rounded-sm backdrop-blur-sm h-full flex flex-col">
        {/* Frame Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />

        {/* Image Container */}
        <div className="relative overflow-hidden bg-black group aspect-[4/5] lg:aspect-auto lg:flex-1">
          <ScanlineOverlay />

          {/* Glitch Image Layers */}
          <motion.img
            src={personal?.redImg}
            alt="Subject 011"
            className="relative z-10 w-full h-full object-cover opacity-90 sepia-[0.5] hue-rotate-[-30deg] contrast-125 hover:sepia-0 transition-all duration-300"
          />

          {/* Holograph Tint */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-red-500/10 to-blue-900/20 mix-blend-overlay" />

          {/* Digital Noise / Glitch Overlay on Hover */}
          <motion.div
            className="absolute inset-0 z-30 opacity-0 group-hover:opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
          />
        </div>

        {/* Status Bar */}
        <div className="mt-2 flex justify-between items-center text-[10px] font-mono text-red-500 uppercase tracking-widest shrink-0">
          <span>ID: {personal.name.split(" ")[0]}_001</span>
          <span className="animate-pulse">● LIVE SIGNAL</span>
        </div>
      </div>
    </motion.div>
  );
});

HoloProfile.displayName = "HoloProfile";

const DataModule = memo(({ title, content, icon: Icon, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group bg-black/60 border border-red-900/30 p-6 overflow-hidden backdrop-blur-md h-full"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Hover Reveal Background */}
      <motion.div
        className="absolute inset-0 bg-red-900/10 z-0"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-2 rounded-sm border ${
              isHovered
                ? "border-red-500 bg-red-500/20"
                : "border-red-900/50 bg-transparent"
            } transition-colors duration-300`}
          >
            <Icon
              className={`text-xl ${isHovered ? "text-white" : "text-red-600"}`}
            />
          </div>
          <IconWrapper isHovered={isHovered} />
        </div>

        <h3 className="text-xl font-bold font-oswald tracking-wide text-white mb-2 group-hover:text-red-400 transition-colors">
          {title}
        </h3>

        <div className="h-px w-12 bg-red-800 mb-4 group-hover:w-full group-hover:bg-red-500 transition-all duration-500" />

        <p className="text-sm font-mono text-red-200 leading-relaxed">
          <span className="opacity-70">&gt; </span>
          {content}
        </p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-red-900/20 group-hover:border-r-red-500/40 transition-colors" />
    </motion.div>
  );
});

const IconWrapper = ({ isHovered }) => (
  <div className="text-red-800 text-xs font-mono">
    {isHovered ? (
      <FiUnlock className="inline mr-1" />
    ) : (
      <FiLock className="inline mr-1" />
    )}
    {isHovered ? "ACCESS GRANTED" : "ENCRYPTED"}
  </div>
);

DataModule.displayName = "DataModule";

const StatBar = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[10px] font-mono text-red-400">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full h-1 bg-red-900/20 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

const TechTerminal = memo(() => {
  const [logs, setLogs] = useState([
    "> INITIALIZING_CORE_SYSTEMS...",
    "> BYPASSING_SECURITY_NODES...",
  ]);

  useEffect(() => {
    const messages = [
      "> OPTIMIZING_RENDER_CYCLES...",
      "> ALLOCATING_VIRTUAL_MEMORY...",
      "> COMPILING_ASSETS_BUNDLE...",
      "> ESTABLISHING_SECURE_UPLINK...",
      "> VERIFYING_INTEGRITY_HASH...",
      "> SYNCING_DATA_STREAMS...",
      "> EXECUTING_SHELL_COMMANDS...",
    ];

    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const time = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLogs((prev) => [`[${time}] ${msg}`, ...prev].slice(0, 6));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 bg-black/80 border border-red-900/30 rounded-md backdrop-blur-md relative overflow-hidden flex flex-col shadow-[0_0_20px_rgba(220,38,38,0.1)] group hover:border-red-500/50 transition-colors duration-500">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-600/10 blur-[50px] rounded-full pointer-events-none" />

      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_3px] opacity-20 pointer-events-none z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/30 bg-red-950/20 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
          <span className="text-red-500 font-bold font-mono tracking-widest text-[10px] uppercase">
            Start_Up_Sequence
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-red-800">
          <span className="flex items-center gap-1">
            CPU <span className="text-red-400">READY</span>
          </span>
          <span className="flex items-center gap-1">
            NET <span className="text-red-400">SECURE</span>
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-[1.5fr,1fr] gap-4 p-4 z-20 overflow-hidden">
        {/* Logs */}
        <div className="flex flex-col justify-end">
          <div className="space-y-1 font-mono text-[10px] text-red-500/80">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1 - i * 0.1, x: 0 }}
                className="whitespace-nowrap truncate"
              >
                <span className="text-red-700 mr-2">$</span>
                {log}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Widget */}
        <div className="flex flex-col justify-end gap-3 p-3 bg-red-900/5 border border-red-900/20 rounded">
          <StatBar label="REACT_DOM" value={98} />
          <StatBar label="HEAP_SIZE" value={62} />
          <StatBar label="LATENCY" value={12} />
        </div>
      </div>
    </div>
  );
});
TechTerminal.displayName = "TechTerminal";

const About = memo(() => {
  const { content } = useContentfulData();
  console.log(content);
  // Hardcoded data to match the screenshot "ARCHIVE_001: IDENTITY"
  const personal = {
    name: "Dhruv Sheladiya",
    redImg: content?.personal?.redImg, // Replace this URL with your actual profile image
    contact: {
      email: "dhruvsheladiya07@gmail.com",
      phone: "+91 95103 34996",
      location: "Remote & On-site",
    },
  };

  const dataModules = [
    {
      title: "ORIGIN STORY",
      content:
        "Frontend architect forged in the React ecosystem. I specialize in deploying high-integrity Next.js environments, engineered for low-latency interactions and fluid cinematic motion.",
      icon: FiHeart,
    },
    {
      title: "CORE DIRECTIVES",
      content:
        "Priority 01: Human-centric node design. Priority 02: Universal accessibility protocols. Priority 03: Narrative-driven UI layers that bridge the gap between user and machine.",
      icon: FiTarget,
    },
    {
      title: "KINETIC PROTOCOLS",
      content:
        "Execution of advanced physics-based motion systems. Choreographing complex micro-interactions. Hard-wired tactile feedback loops for enhanced sensory immersion.",
      icon: FiZap,
    },
    {
      title: "SYSTEM ARCHITECTURE",
      content:
        "Optimization of server-side data streams. Deployment of headless CMS interfaces. Constructing scalable, fault-tolerant component systems and polymorphic architectures.",
      icon: FiCpu,
    },
  ];

  if (!personal) return null;

  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(20,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          eyebrow="FILE: SUBJECT INFO"
          title="ARCHIVE_001: IDENTITY"
          subtitle="Decrypting the developer behind the code."
        />

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 mt-16 items-stretch">
          {/* Column 1: Profile Entity */}
          <div className="flex flex-col gap-8 h-full">
            <HoloProfile personal={personal} className="flex-1" />

            {/* Contact Terminal */}
            <div className="border border-red-900/30 bg-black/80 p-6 font-mono text-sm relative shrink-0">
              <div className="absolute -top-3 left-4 bg-black px-2 text-red-500 text-xs tracking-widest border border-red-900/30">
                COMMUNICATION_UPLINK
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${personal.contact.email}`}
                  className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors group"
                >
                  <span className="p-2 border border-red-900/30 rounded group-hover:border-red-500 group-hover:bg-red-900/20">
                    <FiMail />
                  </span>
                  <span className="truncate">{personal.contact.email}</span>
                </a>
                <a
                  href={`tel:${personal.contact.phone}`}
                  className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors group"
                >
                  <span className="p-2 border border-red-900/30 rounded group-hover:border-red-500 group-hover:bg-red-900/20">
                    <FiPhone />
                  </span>
                  <span>{personal.contact.phone}</span>
                </a>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="p-2 border border-red-900/30 rounded">
                    <FiMapPin />
                  </span>
                  <span>{personal.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Data Modules */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {dataModules.map((module, idx) => (
                <DataModule key={idx} {...module} index={idx} />
              ))}
            </div>

            {/* System Diagnostics Row */}
            <div className="border-t border-red-900/30 pt-6 mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiZap className="text-red-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase flex items-center gap-2">
                    CORE_SYSTEMS_DIAGNOSTIC
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] text-red-800 font-mono bg-red-900/10 px-2 py-1 rounded">
                  Status: <span className="text-red-400">OPTIMAL</span>
                </div>
              </div>
              <TechTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;

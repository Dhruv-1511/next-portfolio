import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiDribbble,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import SectionHeading from "../components/SectionHeading";
import { useContentfulData } from "../context/ContentfulContext";

const iconMap = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Twitter: FiTwitter,
  Dribbble: FiDribbble,
  Instagram: FaInstagram,
  Whatsapp: FaWhatsapp,
};

const Contact = () => {
  const { content } = useContentfulData();
  const { personal, socials } = content;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  if (!personal || !socials || socials.length === 0) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);
    setSubmitted(false);

    try {
      // Use Netlify Function endpoint
      // In production, this will be /.netlify/functions/send-mail
      // In development with netlify dev, it will also work
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 md:py-24">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s create something extraordinary together."
          subtitle="Open to collaborations, remote roles, and creative partnerships."
        />

        <div className="grid gap-12 lg:grid-cols-[0.55fr,0.45fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-8 shadow-2xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@example.com"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
              </label>
            </div>
            <label className="mt-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell me about your project..."
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
              />
            </label>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{
                scale: isLoading ? 1 : 1.05,
              }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`group relative mt-8 flex items-center justify-center gap-2 rounded-lg px-6 sm:px-10 py-4 text-sm font-bold uppercase tracking-[0.5em] transition-all duration-500 font-serif max-w-[272px] w-full ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              style={{
                textShadow: isLoading
                  ? "none"
                  : "0 0 10px rgba(255, 9, 9, 0.8), 0 0 20px rgba(255, 9, 9, 0.6), 0 0 30px rgba(255, 9, 9, 0.4)",
                WebkitTextStroke: isLoading ? "none" : "0.5px #ff0909",
              }}
            >
              {/* Inner container for button background and content - keeps glow contained */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-lg border-2 transition-all duration-500 ${
                  isLoading
                    ? "border-stone-600/90 bg-gradient-to-br from-black via-stone-800/30 to-black"
                    : "border-red-600/90 bg-gradient-to-br from-black via-red-950/30 to-black shadow-[0_0_25px_rgba(255,9,9,0.6),inset_0_0_15px_rgba(255,9,9,0.1)] group-hover:border-red-500"
                }`}
              >
                {/* Animated background glow - only when not loading */}
                {!isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                {/* Corner accents */}
                {!isLoading && (
                  <>
                    <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
                    <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
                    <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
                  </>
                )}
              </div>

              {/* Button text */}
              <span
                className={`relative z-10 transition-all duration-300 ${
                  isLoading
                    ? "text-red-500"
                    : "text-red-500 group-hover:text-white drop-shadow-[0_0_8px_rgba(255,0,0,1)] group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)]"
                }`}
                style={
                  isLoading
                    ? {
                        textShadow:
                          "0 0 8px rgba(255, 0, 0, 0.8), 0 0 15px rgba(255, 0, 0, 0.6), 0 0 25px rgba(255, 0, 0, 0.4), 0 0 35px rgba(255, 0, 0, 0.3)",
                      }
                    : {}
                }
              >
                {isLoading ? "Sending" : "Send Message"}
              </span>

              {/* Vine/Tendril Animations - Hyper-realistic twisted woody vines */}
              {/* Top-left vine */}
              <motion.svg
                className="absolute -top-6 -left-6 w-44 h-44 pointer-events-none z-20"
                viewBox="0 0 200 200"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isLoading ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <defs>
                  <filter id="woodRoughness">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.08"
                      numOctaves="4"
                      result="noise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="3"
                    />
                    <feDropShadow
                      dx="2"
                      dy="2"
                      stdDeviation="2"
                      floodColor="#000"
                      floodOpacity="0.5"
                    />
                  </filter>
                  <filter
                    id="greenGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.133
                                                                     0 0 0 0 0.773
                                                                     0 0 0 0 0.369
                                                                     0 0 0 0.8 0"
                    />
                    <feMerge>
                      <feMergeNode in="SourceGraphic" />
                      <feMergeNode />
                    </feMerge>
                  </filter>
                  <linearGradient
                    id="woodGrad2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#2a231d" />
                    <stop offset="40%" stopColor="#4a3b2a" />
                    <stop offset="100%" stopColor="#1a1510" />
                  </linearGradient>
                </defs>

                {/* Main twisted vine - Green glow layer */}
                <motion.path
                  d="M12,10 C32,-2 26,40 54,32 C82,26 60,82 92,74 C120,70 126,104 150,98 C174,92 178,114 188,106"
                  stroke="#22c55e"
                  strokeWidth="6.4"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut" }}
                />
                {/* Main twisted vine */}
                <motion.path
                  d="M12,10 C32,-2 26,40 54,32 C82,26 60,82 92,74 C120,70 126,104 150,98 C174,92 178,114 188,106"
                  stroke="url(#woodGrad2)"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut" }}
                />

                {/* Secondary twisted vine - Green glow layer */}
                <motion.path
                  d="M20,8 C30,30 14,54 40,70 C62,80 72,64 80,86 C92,94 104,94 118,98 C132,102 146,108 154,112"
                  stroke="#22c55e"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
                />
                {/* Secondary twisted vine */}
                <motion.path
                  d="M20,8 C30,30 14,54 40,70 C62,80 72,64 80,86 C92,94 104,94 118,98 C132,102 146,108 154,112"
                  stroke="url(#woodGrad2)"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
                />

                {/* Thorns */}
                <motion.path
                  d="M40,32 L36,24 M56,56 L60,48 M76,72 L72,64"
                  stroke="#1a1510"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 1 : 0 }}
                  transition={{ delay: 0.75, duration: 0.25 }}
                />

                {/* Leaves */}
                <g transform="translate(48, 56) rotate(-15)">
                  <motion.path
                    d="M0,0 Q6.4,-6.4 12.8,0 Q6.4,6.4 0,0 M0,0 L12.8,0"
                    fill="#2d4a1e"
                    stroke="#1a2b11"
                    strokeWidth="0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: isLoading ? 1 : 0 }}
                    transition={{ delay: 0.5, duration: 0.25, type: "spring" }}
                  />
                </g>
              </motion.svg>

              {/* Top-right vine */}
              <motion.svg
                className="absolute -top-6 -right-12 w-44 h-44 pointer-events-none z-20"
                viewBox="0 0 200 200"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isLoading ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <defs>
                  <filter
                    id="greenGlow2"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.133
                                                                     0 0 0 0 0.773
                                                                     0 0 0 0 0.369
                                                                     0 0 0 0.8 0"
                    />
                    <feMerge>
                      <feMergeNode in="SourceGraphic" />
                      <feMergeNode />
                    </feMerge>
                  </filter>
                </defs>
                {/* Main vine - Green glow layer */}
                <motion.path
                  d="M148,10 C124,0 132,40 110,30 C92,24 106,82 80,76 C56,72 40,100 24,96 C12,94 8,110 10,114"
                  stroke="#22c55e"
                  strokeWidth="6.4"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow2)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut", delay: 0.1 }}
                />
                <motion.path
                  d="M148,10 C124,0 132,40 110,30 C92,24 106,82 80,76 C56,72 40,100 24,96 C12,94 8,110 10,114"
                  stroke="url(#woodGrad2)"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut", delay: 0.1 }}
                />
                {/* Secondary vine - Green glow layer */}
                <motion.path
                  d="M140,8 C132,30 148,54 120,70 C98,80 90,64 82,86 C70,94 58,96 44,100 C32,104 22,110 14,112"
                  stroke="#22c55e"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow2)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.25 }}
                />
                <motion.path
                  d="M140,8 C132,30 148,54 120,70 C98,80 90,64 82,86 C70,94 58,96 44,100 C32,104 22,110 14,112"
                  stroke="url(#woodGrad2)"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.25 }}
                />
                <motion.path
                  d="M120,32 L124,24 M100,56 L96,48 M88,72 L92,64"
                  stroke="#1a1510"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 1 : 0 }}
                  transition={{ delay: 0.85, duration: 0.25 }}
                />
                <g transform="translate(112, 56) rotate(15)">
                  <motion.path
                    d="M0,0 Q6.4,-6.4 12.8,0 Q6.4,6.4 0,0 M0,0 L12.8,0"
                    fill="#2d4a1e"
                    stroke="#1a2b11"
                    strokeWidth="0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: isLoading ? 1 : 0 }}
                    transition={{ delay: 0.6, duration: 0.25, type: "spring" }}
                  />
                </g>
              </motion.svg>

              {/* Bottom-left vine */}
              <motion.svg
                className="absolute -bottom-6 -left-6 w-44 h-44 pointer-events-none z-20"
                viewBox="0 0 200 200"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isLoading ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <defs>
                  <filter
                    id="greenGlow3"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.133
                                                                     0 0 0 0 0.773
                                                                     0 0 0 0 0.369
                                                                     0 0 0 0.8 0"
                    />
                    <feMerge>
                      <feMergeNode in="SourceGraphic" />
                      <feMergeNode />
                    </feMerge>
                  </filter>
                </defs>
                {/* Main vine - Green glow layer */}
                <motion.path
                  d="M12,190 C34,200 26,158 54,166 C80,172 60,118 92,126 C118,132 124,98 148,104 C170,110 176,90 188,96"
                  stroke="#22c55e"
                  strokeWidth="6.4"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow3)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.path
                  d="M12,190 C34,200 26,158 54,166 C80,172 60,118 92,126 C118,132 124,98 148,104 C170,110 176,90 188,96"
                  stroke="url(#woodGrad2)"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut", delay: 0.2 }}
                />
                {/* Secondary vine - Green glow layer */}
                <motion.path
                  d="M20,192 C30,170 16,146 44,130 C70,118 70,142 82,118 C90,106 104,104 118,100 C132,96 144,92 154,88"
                  stroke="#22c55e"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow3)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.35 }}
                />
                <motion.path
                  d="M20,192 C30,170 16,146 44,130 C70,118 70,142 82,118 C90,106 104,104 118,100 C132,96 144,92 154,88"
                  stroke="url(#woodGrad2)"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.35 }}
                />
                <g transform="translate(48, 128) rotate(-45)">
                  <motion.path
                    d="M0,0 Q6.4,-6.4 12.8,0 Q6.4,6.4 0,0 M0,0 L12.8,0"
                    fill="#2d4a1e"
                    stroke="#1a2b11"
                    strokeWidth="0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: isLoading ? 1 : 0 }}
                    transition={{ delay: 0.7, duration: 0.25, type: "spring" }}
                  />
                </g>
              </motion.svg>

              {/* Bottom-right vine */}
              <motion.svg
                className="absolute -bottom-6 -right-12 w-44 h-44 pointer-events-none z-20"
                viewBox="0 0 200 200"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isLoading ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <defs>
                  <filter
                    id="greenGlow4"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.133
                                                                     0 0 0 0 0.773
                                                                     0 0 0 0 0.369
                                                                     0 0 0 0.8 0"
                    />
                    <feMerge>
                      <feMergeNode in="SourceGraphic" />
                      <feMergeNode />
                    </feMerge>
                  </filter>
                </defs>
                {/* Main vine - Green glow layer */}
                <motion.path
                  d="M148,190 C124,200 132,158 106,166 C84,172 102,118 76,126 C52,132 40,98 22,104 C10,108 8,96 10,90"
                  stroke="#22c55e"
                  strokeWidth="6.4"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow4)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.path
                  d="M148,190 C124,200 132,158 106,166 C84,172 102,118 76,126 C52,132 40,98 22,104 C10,108 8,96 10,90"
                  stroke="url(#woodGrad2)"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: "easeInOut", delay: 0.3 }}
                />
                {/* Secondary vine - Green glow layer */}
                <motion.path
                  d="M140,192 C132,170 146,146 118,130 C96,118 90,142 82,118 C72,108 58,104 44,100 C32,96 22,92 14,90"
                  stroke="#22c55e"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#greenGlow4)"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.45 }}
                />
                <motion.path
                  d="M140,192 C132,170 146,146 118,130 C96,118 90,142 82,118 C72,108 58,104 44,100 C32,96 22,92 14,90"
                  stroke="url(#woodGrad2)"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#woodRoughness)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isLoading ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.45 }}
                />
                <g transform="translate(112, 128) rotate(45)">
                  <motion.path
                    d="M0,0 Q6.4,-6.4 12.8,0 Q6.4,6.4 0,0 M0,0 L12.8,0"
                    fill="#2d4a1e"
                    stroke="#1a2b11"
                    strokeWidth="0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: isLoading ? 1 : 0 }}
                    transition={{ delay: 0.8, duration: 0.25, type: "spring" }}
                  />
                </g>
              </motion.svg>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: submitted ? 1 : 0, y: submitted ? 0 : 20 }}
              className="mt-4 text-sm text-green-400"
            >
              ✅ Thanks! Your message has been sent successfully.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: error ? 1 : 0, y: error ? 0 : 20 }}
              className="mt-4 text-sm text-red-400"
            >
              ❌ Oops! Something went wrong. Please try again.
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-red-600/50 bg-black/80 p-8 shadow-[0_0_30px_rgba(255,0,0,0.25)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] transition-shadow duration-500"
          >
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-br from-red-900/20 via-black/0 to-red-900/10"
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -left-16 -top-24 h-52 w-52 rounded-full bg-gradient-to-br from-red-600/20 to-transparent blur-3xl"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-gradient-to-tl from-red-600/20 to-transparent blur-3xl"
              animate={{ y: [12, -12, 12] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500 font-mono drop-shadow-[0_0_2px_rgba(255,0,0,0.5)]">
                  Email
                </p>
                <div className="flex items-center gap-3 text-sm font-semibold text-white font-serif tracking-wide drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
                  <FiMail className="text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                  {personal.contact.email}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500 font-mono drop-shadow-[0_0_2px_rgba(255,0,0,0.5)]">
                  Phone
                </p>
                <div className="flex items-center gap-3 text-sm font-semibold text-white font-serif tracking-wide drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
                  <FiPhone className="text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                  {personal.contact.phone}
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500 font-mono drop-shadow-[0_0_2px_rgba(255,0,0,0.5)]">
                  Social Reach
                </p>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {socials?.map((social) => {
                    const Icon = iconMap[social?.label] ?? FiLinkedin;
                    return (
                      <motion.a
                        key={social?.label}
                        href={social?.href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group flex items-center gap-3 rounded-2xl border border-red-900/50 bg-black/40 px-2 py-3 text-sm font-medium text-white transition shadow-[0_0_10px_rgba(255,0,0,0.1)] hover:border-red-500 hover:bg-red-900/20 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-900/30 bg-red-900/10 text-lg text-red-500 transition group-hover:border-red-500 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                          <Icon />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 font-mono group-hover:text-red-400 transition-colors group-hover:drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
                            {social?.label}
                          </p>
                          <p className="text-sm font-semibold text-white font-serif tracking-wide group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                            {social?.handle}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

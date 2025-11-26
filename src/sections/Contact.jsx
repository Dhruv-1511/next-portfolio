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
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
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
                scale: isLoading ? 1 : 1.08,
                boxShadow:
                  "0 0 40px rgba(255, 9, 9, 1), 0 0 80px rgba(255, 9, 9, 0.5), inset 0 0 20px rgba(255, 9, 9, 0.2)",
              }}
              whileTap={{ scale: isLoading ? 1 : 0.92 }}
              className={`group relative mt-8 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-red-600/90 bg-gradient-to-br from-black via-red-950/30 to-black px-10 py-4 text-sm font-bold uppercase tracking-[0.5em] text-red-500 shadow-[0_0_25px_rgba(255,9,9,0.6),inset_0_0_15px_rgba(255,9,9,0.1)] hover:border-red-500 hover:text-white transition-all duration-500 font-serif ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              style={{
                textShadow:
                  "0 0 10px rgba(255, 9, 9, 0.8), 0 0 20px rgba(255, 9, 9, 0.6), 0 0 30px rgba(255, 9, 9, 0.4)",
                WebkitTextStroke: "0.5px #ff0909",
              }}
            >
              {/* Animated background glow */}
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

              {/* Flickering overlay effect */}
              <motion.div
                className="absolute inset-0 bg-red-600/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Button text with glow */}
              <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,0,0,1)] group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)] transition-all duration-300">
                {isLoading ? "Sending..." : "Send Message"}
              </span>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
              <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
              <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
              <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-red-600/80 group-hover:border-red-500 transition-colors" />
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

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialIcons = [
  { label: "GitHub", href: "https://github.com/Dhruv-1511", Icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-sheladiya-a350582a6", Icon: FiLinkedin },
  { label: "Whatsapp", href: "https://wa.me/919510334996", Icon: FaWhatsapp },
];

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative mt-24 border-t border-white/10 bg-slate-950/80 py-12"
  >
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 text-center md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.45em] text-slate-400">
          Dhruv Sheladiya
        </p>
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Crafted with React, Tailwind CSS, Contentful & Framer
          Motion.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover-underline text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex justify-center gap-3">
        {socialIcons.map(({ label, href, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-brand-500/40 hover:text-brand-300"
          >
            <Icon size={18} />
            <span className="sr-only">{label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </motion.footer>
);

export default Footer;

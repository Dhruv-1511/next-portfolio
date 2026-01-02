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
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhruv-sheladiya-a350582a6",
    Icon: FiLinkedin,
  },
  { label: "Whatsapp", href: "https://wa.me/919510334996", Icon: FaWhatsapp },
];

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative mt-24 border-t border-red-900/30 bg-red-950/20 py-12 backdrop-blur-md"
  >
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 text-center md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.45em] text-zinc-500 font-bold">
          Dhruv Sheladiya
        </p>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Crafted with Next.js, Tailwind CSS,
          Contentful & Framer Motion.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover-underline text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500 transition hover:text-red-400"
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-red-900/30 bg-red-950/10 text-zinc-400 transition hover:border-red-500 hover:bg-red-900/40 hover:text-red-400 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
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

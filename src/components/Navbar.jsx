import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const logoControls = useAnimation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 24]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 96; // compensate for fixed navbar height
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setActive(id);
    setMenuOpen(false);
  };

  const navVariants = useMemo(
    () => ({
      hidden: { y: -60, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 20 },
      },
    }),
    []
  );

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 z-50 w-full"
        style={{
          backgroundColor: "rgba(5, 5, 5, 0.95)",
          backdropFilter: `blur(${headerBlur}px)`,
          borderBottom: "1px solid #ff0909",
          boxShadow: "0 0 15px rgba(255, 9, 9, 0.2)",
        }}
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left z-50"
          style={{
            scaleX,
            background: "#ff0909",
            boxShadow: "0 0 10px #ff0909",
          }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a
            href=""
            className="group relative flex items-center gap-4 text-lg font-semibold tracking-tight text-white"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLinkClick("home")}
          >
            {/* Stranger Things Style Logo */}
            <div className="flex leading-none items-center text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 stroke-red-500 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
              <img
                src="/logo192.png"
                alt="Logo"
                className="relative z-10 size-8 object-contain drop-shadow-lg "
              />
              <motion.span
                className="text-3xl font-serif font-bold "
                style={{ WebkitTextStroke: "1px #ff0909" }}
              >
                HRUV
              </motion.span>
              <motion.div
                className="h-0.5 w-full bg-red-600 shadow-[0_0_5px_#ff0000] mt-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, index) => {
              const isActive = active === link.id;
              return (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className="group relative px-4 py-2 text-sm font-bold uppercase tracking-widest font-serif text-slate-300 hover:text-red-500 transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}

                  {/* Active/Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-600 shadow-[0_0_5px_#ff0000] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative flex items-center justify-center p-2 text-white md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <HiX size={28} className="text-red-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <HiOutlineMenu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-black border-t border-red-900 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = active === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      type="button"
                      className={`text-left text-lg font-bold uppercase tracking-widest font-serif ${
                        isActive
                          ? "text-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]"
                          : "text-white"
                      }`}
                      onClick={() => handleLinkClick(link.id)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;

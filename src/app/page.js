"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Loader from "../components/Loader";
import ParticlesBackground from "../components/ParticlesBackground";
import BackgroundMusic from "../components/BackgroundMusic";
import { useContentfulData } from "../context/ContentfulContext";

export default function Home() {
  const { loading: isLoading } = useContentfulData();
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <Loader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {!showLoader && (
        <div className="relative min-h-screen bg-transparent text-slate-200 font-sans selection:bg-red-900 selection:text-white">
          <div className="upside-down-overlay" />
          <ParticlesBackground />
          <BackgroundMusic />
          <Navbar />
          <main className="flex flex-col gap-24 pt-24 relative z-10">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

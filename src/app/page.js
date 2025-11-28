"use client";

import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Loader from "../components/Loader";
import ParticlesBackground from "../components/ParticlesBackground";
import BackgroundMusic from "../components/BackgroundMusic";
import { useContentfulData } from "../context/ContentfulContext";

// Lazy load sections for better performance
const About = lazy(() => import("../sections/About"));
const Education = lazy(() => import("../sections/Education"));
const Skills = lazy(() => import("../sections/Skills"));
const Experience = lazy(() => import("../sections/Experience"));
const Projects = lazy(() => import("../sections/Projects"));
const Contact = lazy(() => import("../sections/Contact"));
const Footer = lazy(() => import("../sections/Footer"));

export default function Home() {
  const { loading: isLoading } = useContentfulData();
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      <BackgroundMusic />
      <AnimatePresence mode="wait">
        {showLoader && (
          <Loader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {!showLoader && (
        <div className="relative min-h-screen bg-transparent text-slate-200 font-sans selection:bg-red-900 selection:text-white">
          <div className="upside-down-overlay" />
          <ParticlesBackground />
          <Navbar />
          <main className="flex flex-col gap-12 pt-24 relative z-10">
            <Hero />
            <Suspense fallback={<div className="h-screen" />}>
              <About />
            </Suspense>
            <Suspense fallback={<div className="h-screen" />}>
              <Education />
            </Suspense>
            <Suspense fallback={<div className="h-screen" />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<div className="h-screen" />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<div className="h-screen" />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div className="h-screen" />}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>
        </div>
      )}
    </>
  );
}

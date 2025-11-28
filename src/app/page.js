"use client";

import { useState, lazy, Suspense, memo } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Loader from "../components/Loader";
import ParticlesBackground from "../components/ParticlesBackground";
import { useContentfulData } from "../context/ContentfulContext";

// Lazy load sections for better performance
const BackgroundMusic = lazy(() => import("../components/BackgroundMusic"));
const About = lazy(() => import("../sections/About"));
const Education = lazy(() => import("../sections/Education"));
const Skills = lazy(() => import("../sections/Skills"));
const Experience = lazy(() => import("../sections/Experience"));
const Projects = lazy(() => import("../sections/Projects"));
const Contact = lazy(() => import("../sections/Contact"));
const Footer = lazy(() => import("../sections/Footer"));

const Home = memo(function Home() {
  const { loading: isLoading } = useContentfulData();
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {/* Lazy load BackgroundMusic after initial load */}
      {!showLoader && (
        <Suspense fallback={null}>
          <BackgroundMusic />
        </Suspense>
      )}

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
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-red-500">Loading...</div>
                </div>
              }
            >
              <About />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-red-500">Loading...</div>
                </div>
              }
            >
              <Education />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-red-500">Loading...</div>
                </div>
              }
            >
              <Skills />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-red-500">Loading...</div>
                </div>
              }
            >
              <Experience />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-red-500">Loading...</div>
                </div>
              }
            >
              <Projects />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-red-500">Loading...</div>
                </div>
              }
            >
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
});

export default Home;

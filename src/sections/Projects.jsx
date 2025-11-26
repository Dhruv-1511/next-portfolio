import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import ExpandableCard from "../components/aceternity/ExpandableCard";
import { useContentfulData } from "../context/ContentfulContext";

const Projects = () => {
  const { content } = useContentfulData();
  const { projects } = content;
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!projects || projects.length === 0) {
    return null;
  }

  const handleExpand = (index) => {
    setExpandedIndex(index);
    if (index !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <section
      id="projects"
      className="relative scroll-mt-32 md:scroll-mt-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Projects"
          title="Crafting digital experiences that inspire and convert."
          subtitle="A collection of innovative projects showcasing modern design, cutting-edge technology, and exceptional user experiences."
        />

        {/* Grid Layout */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ExpandableCard
              key={project.title}
              project={project}
              index={index}
              expanded={expandedIndex}
              onExpand={handleExpand}
            />
          ))}
        </div>

        {/* Decorative Background Elements */}
        {/* <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute right-0 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: "rgba(99, 102, 241, 0.4)" }}
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
          <motion.div
            className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-8"
            style={{ background: "rgba(14, 165, 233, 0.4)" }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div> */}
      </div>
    </section>
  );
};

export default Projects;

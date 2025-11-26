"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAllContent } from "../lib/contentful";

const ContentfulContext = createContext({
  content: {
    personal: null,
    heroCtas: [],
    education: [],
    skills: [],
    experiences: [],
    projects: [],
    socials: [],
  },
  loading: true,
  error: null,
});

export const useContentfulData = () => {
  const context = useContext(ContentfulContext);
  if (!context) {
    throw new Error("useContentfulData must be used within ContentfulProvider");
  }
  return context;
};

export const ContentfulProvider = ({ children }) => {
  const [content, setContent] = useState({
    personal: null,
    heroCtas: [],
    education: [],
    skills: [],
    experiences: [],
    projects: [],
    socials: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllContent();
        setContent(data);
      } catch (err) {
        console.error("Failed to fetch content from Contentful:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  return (
    <ContentfulContext.Provider value={{ content, loading, error }}>
      {children}
    </ContentfulContext.Provider>
  );
};

import { useState, useEffect } from "react";
import {
  getPersonal,
  getHeroCtas,
  getEducation,
  getSkills,
  getExperiences,
  getProjects,
  getSocials,
  getAllContent,
} from "../lib/contentful";

// Hook to check if all content is loaded
export const useContentfulLoading = () => {
  // Call all hooks first (React rules)
  const personal = usePersonal();
  const heroCtas = useHeroCtas();
  const education = useEducation();
  const skills = useSkills();
  const experiences = useExperiences();
  const projects = useProjects();
  const socials = useSocials();

  // Then check loading states
  const isLoading =
    personal.loading ||
    heroCtas.loading ||
    education.loading ||
    skills.loading ||
    experiences.loading ||
    projects.loading ||
    socials.loading;

  // Check if we have essential data (at least some data loaded)
  const hasData =
    personal.data ||
    heroCtas.data?.length > 0 ||
    education.data?.length > 0 ||
    skills.data?.length > 0 ||
    experiences.data?.length > 0 ||
    projects.data?.length > 0 ||
    socials.data?.length > 0;

  return { isLoading, hasData };
};

// Custom hook to fetch all content from Contentful
export const useContentful = () => {
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
    const fetchContent = async () => {
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

    fetchContent();
  }, []);

  return { content, loading, error };
};

// Individual hooks for specific content types
export const usePersonal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPersonal()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useHeroCtas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHeroCtas()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useEducation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEducation()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSkills()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useExperiences = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getExperiences()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useSocials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSocials()
      .then(setData)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

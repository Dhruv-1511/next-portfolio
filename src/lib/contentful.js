import { createClient } from "contentful";

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Helper function to extract image URL from Contentful asset
const getImageUrl = (asset) => {
  if (!asset) return null;
  if (asset.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  return asset.url || null;
};

// Helper function to extract file URL from Contentful asset
const getFileUrl = (asset) => {
  if (!asset) return null;
  if (asset.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  return asset.url || null;
};

// Fetch Personal Information
export const getPersonal = async () => {
  try {
    const response = await client.getEntries({
      content_type: "personal",
      limit: 1,
    });

    if (response.items.length === 0) {
      throw new Error("No personal information found");
    }

    const entry = response.items[0].fields;
    return {
      name: entry.name || "",
      role: entry.role || "",
      photo: getImageUrl(entry.photo),
      redImg: getImageUrl(entry.redImg),
      summary: entry.summary || "",
      highlights: [
        { label: "Age", value: entry.age || "" },
        { label: "Country", value: entry.country || "" },
        { label: "Experience", value: entry.experience || "" },
      ],
      contact: {
        email: entry.email || "",
        phone: entry.phone || "",
        location: entry.location || "",
      },
    };
  } catch (error) {
    console.error("Error fetching personal information:", error);
    throw error;
  }
};

// Fetch Hero CTAs
export const getHeroCtas = async () => {
  try {
    const response = await client.getEntries({
      content_type: "heroCta",
      order: "sys.createdAt",
    });

    return response.items.map((item) => {
      const fields = item.fields;
      const cta = {
        label: fields.label || "",
        href: fields.href || "#",
        variant: fields.variant || "primary",
      };

      // If it's a download link, add download attribute
      if (fields.download) {
        cta.download = fields.download;
        // If there's a file field (for resume PDF), use that URL instead
        if (fields.resumeFile) {
          cta.href = getFileUrl(fields.resumeFile);
        }
      }

      return cta;
    });
  } catch (error) {
    console.error("Error fetching hero CTAs:", error);
    throw error;
  }
};

// Fetch Education
export const getEducation = async () => {
  try {
    const response = await client.getEntries({
      content_type: "education",
      order: "sys.createdAt",
    });

    return response.items.map((item) => {
      const fields = item.fields;
      return {
        degree: fields.degree || "",
        institution: fields.institution || "",
        duration: fields.duration || "",
        icon: fields.icon || "",
        accent: fields.accent || "#6366f1",
        description: fields.description || "",
      };
    });
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
};

// Fetch Skills
export const getSkills = async () => {
  try {
    const response = await client.getEntries({
      content_type: "skill",
      order: "sys.createdAt",
    });

    return response.items.map((item) => {
      const fields = item.fields;
      return {
        name: fields.name || "",
        level: fields.level || 0,
        iconUrls: fields.iconUrls || "",
      };
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

// Fetch Experiences
export const getExperiences = async () => {
  try {
    const response = await client.getEntries({
      content_type: "experience",
      order: "-sys.createdAt", // Most recent first
    });

    return response.items.map((item) => {
      const fields = item.fields;
      return {
        company: fields.company || "",
        role: fields.role || "",
        duration: fields.duration || "",
        logoImage: getImageUrl(fields.logoImage),
        accent: fields.accent || "#818cf8",
        location: fields.location || "",
        workMode: fields.workMode || "",
        skills: fields.skills || [],
        achievements: fields.achievements || [],
      };
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};

// Fetch Projects
export const getProjects = async () => {
  try {
    const response = await client.getEntries({
      content_type: "project",
      order: "sys.createdAt",
    });

    return response.items.map((item) => {
      const fields = item.fields;
      return {
        title: fields.title || "",
        description: fields.description || "",
        stack: fields.stack || [],
        demo: fields.demo || "",
        image: getImageUrl(fields.image),
        logo: getImageUrl(fields.logo),
      };
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Fetch Social Links
export const getSocials = async () => {
  try {
    const response = await client.getEntries({
      content_type: "social",
      order: "sys.createdAt",
    });

    return response.items.map((item) => {
      const fields = item.fields;
      return {
        label: fields.label || "",
        href: fields.href || "",
        handle: fields.handle || "",
      };
    });
  } catch (error) {
    console.error("Error fetching socials:", error);
    throw error;
  }
};

// Fetch all data at once (useful for initial load)
export const getAllContent = async () => {
  try {
    const [
      personal,
      heroCtas,
      education,
      skills,
      experiences,
      projects,
      socials,
    ] = await Promise.all([
      getPersonal(),
      getHeroCtas(),
      getEducation(),
      getSkills(),
      getExperiences(),
      getProjects(),
      getSocials(),
    ]);

    return {
      personal,
      heroCtas,
      education,
      skills,
      experiences,
      projects,
      socials,
    };
  } catch (error) {
    console.error("Error fetching all content:", error);
    throw error;
  }
};

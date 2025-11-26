import myImg from "../assets/myImg.jpg";
import RedImg from "../assets/red-bg.png";
import coinCapImage from "../assets/coin-cap.svg";
import coinCapLogo from "../assets/coin-cap-logo.png";
import porterImage from "../assets/porter.svg";
import porterLogo from "../assets/porter-logo.svg";
import skillzapImage from "../assets/skillzap.svg";
import skillzapLogo from "../assets/skillzap-logo.png";
import slashstarLogo from "../assets/slashstar.png";
import madviseLogo from "../assets/madvise.png";
import resumePdf from "../assets/dhruv_resume.pdf";

export const personal = {
  name: "Dhruv Sheladiya",
  role: "Frontend Developer — React.js Specialist",
  photo: myImg,
  redImg: RedImg,
  summary:
    "I am a passionate frontend developer specializing in React.js, crafting snappy interfaces, immersive user journeys, and animation-rich experiences with modern tooling.",
  highlights: [
    { label: "Age", value: "21" },
    { label: "Country", value: "India" },
    { label: "Experience", value: "1.5+ Years" },
  ],
  contact: {
    email: "dhruvsheladiya07@gmail.com",
    phone: "+91 95103 34996",
    location: "Remote & On-site",
  },
};

export const heroCtas = [
  {
    label: "Download CV",
    href: resumePdf,
    variant: "primary",
    download: "Dhruv_Sheladiya_Resume.pdf",
  },
  {
    label: "Contact Me",
    href: "#contact",
    variant: "secondary",
  },
];

export const education = [
  {
    degree: "BCA",
    institution: "SDJ Interrnational College",
    duration: "2022 – 2025",
    icon: "FaGraduationCap",
    accent: "#6366f1",
    description:
      "Focused on human-centered interface design, performance optimization, and collaborative product delivery.",
  },
  {
    degree: "12th — Commerce",
    institution: "Shree Vashisth Vidyalaya",
    duration: "2021-2022",
    icon: "FaUniversity",
    accent: "#38bdf8",
    description:
      "Graduated with honors in mathematics and computer science with a keen interest in creative coding.",
  },
];

export const skills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 92 },
  { name: "JavaScript", level: 90 },
  { name: "React js", level: 94 },
  { name: "Next js", level: 94 },
  { name: "Redux", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Git", level: 90 },
];

export const experiences = [
  {
    company: "Slashstar",
    role: "Frontend Developer",
    duration: "Feb 2025 – Present",
    logoImage: slashstarLogo,
    accent: "#818cf8",
    location: "Surat, India",
    workMode: "On-site",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React js",
      "Next js",
      "Redux",
      "Tailwind CSS",
      "Git",
    ],
    achievements: [
      "Built immersive marketing sites with Framer Motion and headless CMS stacks.",
      "Lead design-to-code workflow, improving delivery speed by 25%.",
    ],
  },
  {
    company: "Madvise Infotech",
    role: "Frontend Developer",
    duration: "Jan 2024 – Jan 2024",
    logoImage: madviseLogo,
    accent: "#06b6d4",
    location: "Surat, India",
    workMode: "On-site",
    skills: ["HTML", "CSS", "JavaScript", "React js", "Git"],
    achievements: [
      "Developed a responsive and user-friendly website for Madvise Infotech.",
    ],
  },
];

export const projects = [
  {
    title: "Skillzap",
    description:
      "I developed Skillzap ai, an intelligent learning platform designed as a smart companion for students, professionals, and curious learners. Built with a modern, high-performance architecture, the platform uses AI-powered flashcards, trivia challenges, and real-time multiplayer battles to help users master any topic in an engaging way. Users can upload PowerPoint presentations, PDFs, or audio files, which are instantly converted into personalized learning decks using advanced AI processing. The platform also features seamless social authentication with Google, Apple, and Facebook login, along with integrated Google Ads for monetization. With a polished UI, fast performance, and dynamic gamification systems, Skillza delivers an interactive and customizable learning experience for both individuals and teams.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React js",
      "Tailwind CSS",
      "Socket.io",
      "api",
    ],
    demo: "http://skillzapai.com/",
    image: skillzapImage,
    logo: skillzapLogo,
  },
  {
    title: "PorterYachts",
    description:
      "I built a high-performance, SEO-optimized Next.js website for a luxury yacht booking company. The platform allows users to explore and book premium yachts with an elegant, modern UI and fast server-side rendering for improved search visibility. I implemented an advanced multi-filter system enabling users to refine yachts by Location, Duration, Length, Price, and Amenities, ensuring a smooth and intuitive browsing experience. The site is fully responsive, optimized for speed, and designed to showcase luxury yacht listings in a visually appealing and user-centric way.",
    stack: ["HTML", "CSS", "JavaScript", "Formik", "Tailwind CSS"],
    demo: "https://porteryachts.com/",
    image: porterImage,
    logo: porterLogo,
  },
  {
    title: "Coin Cap",
    description:
      "I developed a fully responsive cryptocurrency market tracking web application using React and Tailwind CSS for a freelance client. The platform presents real-time data for 100+ cryptocurrencies, showcasing live price updates, market capitalization, trading volume, and other key market indicators. To enhance usability, I implemented an optimized advanced search system capable of filtering and locating coins with less than 1-second query time, ensuring a seamless and efficient user experience. The project focuses on performance, clean UI, and accurate data visualization to help users monitor the crypto market effortlessly.",
    stack: ["HTML", "CSS", "JavaScript", "React js", "Tailwind CSS", "api"],
    demo: "https://coin-cap-eight.vercel.app/",
    image: coinCapImage,
    logo: coinCapLogo,
  },
];

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Dhruv-1511",
    handle: "@Dhruv-1511",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhruv-sheladiya-a350582a6",
    handle: "@dhruv",
  },
  {
    label: "Whatsapp",
    href: "https://wa.me/919510334996",
    handle: "+91 95103 34996",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dhruv_15_11_/",
    handle: "@dhruv_15_11_",
  },
];

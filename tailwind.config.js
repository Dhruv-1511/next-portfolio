/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        stranger: ["'Rubik Glitch'", "cursive"], // Glitchy font for effects
        serif: ["'Playfair Display'", "serif"], // For the main title look
      },
      colors: {
        stranger: {
          red: "#ff0909", // Neon Red
          dark: "#050505", // Deep Black
          black: "#000000",
          blue: "#0a1128", // Upside Down Blue
          grey: "#888888",
        },
        brand: {
          500: "#ff0909",
          400: "#ff4d4d",
          300: "#ff8080",
        },
      },
      backgroundImage: {
        "upside-down":
          "radial-gradient(circle at center, #1a0b0b 0%, #000000 100%)",
        "fog-pattern": "url('https://grainy-gradients.vercel.app/noise.svg')", // Replaced broken smoke image with noise
      },
      boxShadow: {
        "glow-red":
          "0 0 20px rgba(255, 9, 9, 0.6), 0 0 40px rgba(255, 9, 9, 0.3)",
        "glow-red2":
          "0 0 10px rgba(255, 9, 9, 0.3), 0 0 20px rgba(255, 9, 9, 0.15)",
        "glow-red3":
          "0 0 15px rgba(255, 9, 9, 0.45), 0 0 30px rgba(255, 9, 9, 0.3)",
        "glow-blue": "0 0 20px rgba(10, 17, 40, 0.6)",
      },
      animation: {
        flicker: "flicker 3s infinite alternate",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "1",
            boxShadow:
              "0 0 20px rgba(255, 9, 9, 0.6), 0 0 40px rgba(255, 9, 9, 0.3)",
          },
          "20%, 24%, 55%": {
            opacity: "0.5",
            boxShadow: "none",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

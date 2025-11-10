/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Audiowide", "sans-serif"],
        code: ["Fira Code", "monospace"],
        accent: ["Orbitron", "sans-serif"],
      },

      colors: {
        musicGreen: "#0ff", // accent color example
        panelBg: "rgba(20,20,20,0.6)", // semi-transparent panel background
      },
      boxShadow: {
        panel: "0 6px 20px rgba(0,0,0,0.6)",
      },
      backdropBlur: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};

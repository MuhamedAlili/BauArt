/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Theme-aware — flip between light/dark via CSS vars in globals.css */
        clay: { DEFAULT: "var(--clay)", dark: "var(--clay-dark)", light: "var(--clay-light)" },
        ink: "var(--ink)",
        stone: {
          50: "var(--stone-50)",
          100: "var(--stone-100)",
          200: "var(--stone-200)",
          300: "var(--stone-300)",
          500: "var(--stone-500)",
          600: "var(--stone-600)",
          800: "var(--stone-800)",
        },
        sand: "var(--sand)",
        paper: "var(--paper)",
        /* Fixed brand accents — never flip, used for deliberately-dark blocks */
        charcoal: "#231F20",
        cream: "#FCFAF5",
        mist: "#D9CDBB",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

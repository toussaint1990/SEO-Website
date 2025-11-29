/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",
        primaryDark: "#1558B0",
        accent: "#22C55E",
        dark: "#050816",
      },
    },
  },
  plugins: [],
};

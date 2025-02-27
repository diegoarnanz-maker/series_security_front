/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#B71C1C",
        secondary: "#D32F2F",
        accent: "#FF5252",
        background: "#FBE9E7",
        card: "#FFCDD2",
        text: "#3E2723",
      },
      fontFamily: {
        tituloLogo: ["tituloLogo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#B71C1C", // Rojo oscuro
        secondary: "#D32F2F", // Rojo medio
        accent: "#FF5252", // Rojo vibrante
        background: "#FBE9E7", // Fondo claro
        card: "#FFCDD2", // Fondo para tarjetas
        text: "#3E2723", // Texto oscuro
      },
      fontFamily: {
        tituloLogo: ["tituloLogo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

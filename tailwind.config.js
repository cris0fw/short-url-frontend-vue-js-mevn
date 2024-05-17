/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lila: "#3B358E",
        celeste: "#38D3D5",
        azul_claro: "#1967D2",
        rojo_error: "#E50914",
        verde_success: "#06980D",
      },
    },
  },
  plugins: [],
};

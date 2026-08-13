/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "preto-fosco": "#0D0C0A",
        grafite: "#1C1A17",
        madeira: "#3B2A1E",
        dourado: "#C9A24B",
        "dourado-claro": "#E4C77E",
        "dourado-escuro": "#7A5D24",
        bege: "#E8DFCF",
        "branco-gelo": "#F5F3EE",
      },
      fontFamily: {
        titulo: ["var(--font-titulo)", "serif"],
        texto: ["var(--font-texto)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};

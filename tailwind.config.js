/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "300px",
        md: "600px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      colors: {
        primary: "#1D3354",
        secondary: "#D64045",
        tertiary: "#467599",
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
        // Tambahkan z-index yang lebih tinggi sesuai kebutuhan Anda
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
  extend: {
    fontFamily: {
      poppins: ["Poppins", "sans"],
    },
  },
};

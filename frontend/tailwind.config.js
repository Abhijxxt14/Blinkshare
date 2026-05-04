/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(400px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}

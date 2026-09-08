/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0e7a5a", dark: "#0b5e46", light: "#e6f4ef", amber: "#d97706", coyote: "#a16207" },
        tactical: { bg: "#f5f7f5", border: "#dde6de" },
        pantera: "#4a5d3a",
        ranger: "#3f4f3a",
        coyote: "#8b5a2b",
        multicam: "#7a6a4b",
      },
      fontFamily: { sans: ["Inter","system-ui","sans-serif"], mono: ["JetBrains Mono","monospace"] }
    },
  },
  plugins: [],
}


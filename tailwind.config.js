/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0e7a5a", dark: "#0b5e46", light: "#e6f4ef" },
        tactical: { bg: "#f5f7f5", border: "#dde6de" }
      },
      fontFamily: { sans: ["Inter","system-ui","sans-serif"], mono: ["JetBrains Mono","monospace"] }
    },
  },
  plugins: [],
}


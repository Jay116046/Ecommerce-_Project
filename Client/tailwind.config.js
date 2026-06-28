/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ... other config
  theme: {
    extend: {
      colors: {
        // This is the line you are likely missing:
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... add other shadcn colors here if they are missing
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

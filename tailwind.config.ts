import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0b0b0c", 2: "#15161a", 3: "#1d1f25" },
        cream: { DEFAULT: "#f4ecd8", soft: "rgba(244,236,216,.65)" },
        gold: { DEFAULT: "#d4af37", bright: "#f5d061" },
        rust: "#c4292e",
        bone: "#d8d2bf",
      },
      fontFamily: {
        display: ['"Anton"', "sans-serif"],
        editorial: ['"Fraunces"', "serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      maxWidth: { container: "1280px" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

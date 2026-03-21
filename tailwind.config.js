const twilightTheme = require("@salla.sa/twilight-tailwind-theme");

module.exports = {
  presets: [twilightTheme],
  content: ["./src/views/**/*.twig", "./src/assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Cairo", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#1E9ED8",
        accent: "#C93A2E",
        vitawise: {
          navy: "#01012D",
          teal: "#DFF2F3",
        },
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        elevated: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 8px 10px -1px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.33%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};

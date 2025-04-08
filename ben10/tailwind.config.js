/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      fontFamily: {
        customgeminis: ["BD_Geminis", "sans-serif"],
        customGameover: ["Game_Over", "sans-serif"],
        customGameoverBold: ["Game_Over_Bold", "sans-serif"],
        customgeminisBold: ["BD_Geminis_Bold", "sans-serif"],
        customNudge: ["NudgeBold", "sans-serif"],
        customNudgeLight: ["NudgeLight", "sans-serif"],
        customNudgeRegular: ["NudgeRegular", "sans-serif"],
        para: ["Arsenal SC", "sans-serif"],
      },
      borderRadius: {
        "custom-radius": "10% 50% 10% 50% / 50% 10% 50% 10%",
      },
    },
  },
  plugins: [],
};

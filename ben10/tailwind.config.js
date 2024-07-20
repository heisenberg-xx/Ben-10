/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        customgeminis:['BD_Geminis', 'sans-serif'],
        customGameover:['Game_Over', 'sans-serif'],
        customGameoverBold:['Game_Over_Bold', 'sans-serif'],
        customgeminisBold:['BD_Geminis_Bold', 'sans-serif'],
        customNudge:['NudgeBold', 'sans-serif'],
        customNudgeLight:['NudgeLight', 'sans-serif'],
        customNudgeRegular:['NudgeRegular', 'sans-serif'],
        para:['Arsenal SC', 'sans-serif'] 
      },
      borderRadius: {
        'custom-radius': '10% 50% 10% 50% / 50% 10% 50% 10%',
      },
    },
  },
  plugins: [],
}
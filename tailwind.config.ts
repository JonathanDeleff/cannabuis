/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // where all the color variables live for tailwind styling
      colors: {
        bg: '#39393A',
        bgSoft: '#E0E0E0', 
        textSoft: '#666666', 
        search: '#9000B3',
        hover: '#EBEBEB',
        pending: '#f7cb7375',
        complete: '#afd6ee75',
        cancelled: '#f7737375',
        button: '#735CDD',
        buttonDark: '#5E4CBB',
        border: '#735CDD',
      },
    },
  },
  plugins: [],
};


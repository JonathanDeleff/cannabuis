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
      colors: {
        bg: '#9B5094',
        bgSoft: '#064874', 
        text: '#white',
        textSoft: '#b7bac1', 
        search: '#CDF7F6',
        hover: '#2E86AB',
        pending: '#f7cb7375',
        complete: '#afd6ee75',
        cancelled: '#f7737375',
        button: '#CDF7F6'
        
      },
    },
  },
  plugins: [],
};


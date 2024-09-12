/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Circular: ["Circular", "sans-serif", "Arial"],
      },
      screens: {
        sm: { max: "430px" },
      },
      colors: {
        "app-grey": "#212529",
        "app-semiGrey": "#152536",
        "app-morning" : "#757475",
        "app-boeder-brand" : "#343A40",
      },
      backgroundImage: {
        "app-userName": "url('/img/input-prefix.png')",
        "app-password": "url('/img/input-prefix2.png')",
        "app-search": "url('/img/search.png')",
      },
      backgroundPosition: {
        "left-10" : '10px center',
      }
    },
  },
  plugins: [],
}


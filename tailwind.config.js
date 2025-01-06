/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [],
  theme: {
    screens: {
      xs: "321px",
      // => @media (min-width: 320px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1080px",
      // => @media (min-width: 1080px) { ... }

      "2xl": "1281px",
      // => @media (min-width: 1280px) { ... }

      "3xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "4xl": "1649px",
      // => @media (min-width: 1536px) { ... }

      "4_2xl": "1880px",
      // => @media (min-width: 1880px) { ... }

      "5xl": "2048px",
      // => @media (min-width: 2048px) { ... }
    },
    fontFamily: {
      body: ["Roboto"],
      display: ["Roboto"],
      sans: ["Roboto"],
      serif: ["Roboto"],
    },

    extend: {
      colors: {
        primary: "#FFA500",
        secondary:"#000000",
        tertiary:"#262626",
        avater:"#4B5563",
        yellow:"#FDBA74"
       
      },
      
     
      
      

    },
    
    
  },
  plugins: [],
}


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
    

    extend: {
      fontFamily: {
        body: ["Roboto"],
        diplay: ["Roboto"],
        sans: ["Roboto"],
        serif: ["Roboto"],
      },
      
      
   
      colors: {
        primary: "#009688",
        "primary-2": "#80CBC4",
        "primary-3": "#419688",
        "primary-4": "#B3E0DB",
        "primary-5": "#E6F5F3",
        "primary-6": "#045750",
        "primary-7": "#07AFA0",
        "primary-lite": "#6ec8c0",
        secondary: "#444f60",
        "secondary-2": "#556987",
        "secondary-3": "#C1C1C1",
        "secondary-4": "#C7CACF",
        "secondary-5": "#444444",
        "secondary-6": "#697280",
        "secondary-7": "#ECECEC",
        "secondary-8": "#ffffff",
        "secondary-9": "#596474",
        "secondary-10": "#E5E5E5",
        "secondary-11": "#E1E1E1",
        "secondary-lite": "#f1f1f1",
        "secondary-lite-2": "#f5f5f5",
        "secondary-lite-3": "#F9FAFB",
        "secondary-dark": "#313131",

        // dark theme colors

        "primary-dark": "#02201D",
        "primary-dark-2": "#ECEDEF",
        "secondary-dark-2": "#1B2637",

        // additional
        "hahu-yellow": "#FBBF24",
        "hahu-blue": "#2563EB",
        "hahu-turquoise": "#00ffe5",
        "hahu-red": "#991B1B",
        "hahu-red-2": "#DC2626",
        "hahu-red-3": "#FEE2E2",
        "hahu-gray": "#444F60",
        "hahu-black": "#111827",
        "hahu-border": "#D1D5DB",
        'hahu-green': "#7DB26D",
      },
    },
  },
  plugins: [],
}


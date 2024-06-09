/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        lightbox: "rgb(0, 0, 0, 0.8)",
        inu_lightorange: "#FED08E",
        inu_darkorange: "#FC8149",
        inu_orange: "#FFB55E",
        inu_peach: "#FFF6E5",
      },
      fontFamily: {
        anton: "Anton",
        inter: "Inter",
        roboto: "Roboto",
      },
      aspectRatio: {
        '5/2': '5 / 2',
      },
    },
  },
  plugins: [],
}


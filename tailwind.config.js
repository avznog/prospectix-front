module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      colors: {
       
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      {
        jisep: {
          "primary": "#6d61a8",
          "secondary":"#F04E2D",
          "accent":"#FFDF4F",
          "neutral":"#3D4451",
          "base-100":"#FFFFFF",
          "info":"#3ABFF8",
          "success":"#36D399",
          "warning":"#FBBD23",
          "error":"#F87272"
        }
      },
      {
        noel: {
          "primary": "#723132",
          "secondary":"#0032BA",
          "accent":"#FFDF4F",
          "neutral":"#0E3397",
          "base-100":"#146B3A",
          "base-300":"#165B33",
          "info":"#3ABFF8",
          "success":"#36D399",
          "warning":"#FBBD23",
          "error":"#F87272"
        }
      }
    ]
  }
}
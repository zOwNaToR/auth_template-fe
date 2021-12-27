module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(.*)/,
      pattern: /text-(.*)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E00FC',
        secondary: '#EAEAEA',
        tertiary: '#FB3640',
        success: '#01D994',
        lightgray: '#F1F3FB',
      },
    },
  },
  plugins: [],
}

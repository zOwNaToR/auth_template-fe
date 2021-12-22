module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(.*)-500/,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '1/2': '1 / 2',
        '1/3': '1 / 3',
        '2/3': '2 / 3',
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fill: 'fill 3s infinite',
      },
      keyframes: {
        fill: {
          '100%': { width: '100%' },
        }
      },
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

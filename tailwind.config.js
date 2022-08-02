module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fill: 'fill 3s infinite',
      },
      colors: {
        'gray-150': '#f6f6f6',
        'almostblack': '#0d0800',
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

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'xs': '.8vw',
      'sm': '1.4vw',
      '4xl': '2.25rem',
    },
    extend: {
      height: {
        landscape: '100vw',
        chrome: 'calc(100vh - 56px)',
      },
      width: {
        landscape: '100vh',
        'landscape-chrome': 'calc(100vh - 56px)',
      },
      transitionDuration: {
        '750': '750ms',
        '3000': '3000ms',
      }
    }
  },
  plugins: [],
}
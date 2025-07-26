module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      textShadow: {
        'intense-glow': '0 0 5px #00E5FF, 0 0 15px #00E5FF, 0 0 30px #00E5FF, 0 0 50px #00E5FF',
      },
      colors: {
        'dark-base': '#050514',
        'dark-secondary': '#14142E',
        'neon-cyan': '#00E5FF',
        'neon-pink': '#FF3EA5',
        'neon-yellow': '#FFD60A',
        'text-white': '#F5F5F5',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-intense-glow': {
          textShadow: '0 0 5px #00E5FF, 0 0 15px #00E5FF, 0 0 30px #00E5FF, 0 0 50px #00E5FF',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
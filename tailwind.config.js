/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',      // Extra small screens, e.g., small phones
        'sm': '640px',       // Small screens, e.g., large phones
        'md': '768px',       // Medium screens, e.g., tablets
        'lg': '1024px',      // Large screens, e.g., small laptops
        'xl': '1280px',      // Extra large screens, e.g., large laptops
        '2xl': '1536px',     // 2x extra large screens, e.g., desktops
        '3xl': '1920px',     // 3x extra large screens, e.g., large desktops
      },
      fontFamily: {
        sans: ["'Fira Sans'", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% / 2))' },
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fade-in 0.2s ease-in-out',
        marquee: 'marquee 25s linear infinite',
        'scroll': 'scroll 20s linear infinite',
      }
    },
  },
  plugins: [],
}
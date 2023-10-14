/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "670px",
      md: "1024px",
      lg: "1280px",
    },
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)'},
          '100%': { transform: 'translateX(-100%)'}
        }
      },
      animation: {
        'scroll': 'scroll 4s linear infinite',
        "my-ping": "ping 1s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        login_bg: "url('./../assets/background_login.webp')",
        register: "url('./../assets/cadastro.webp')",
      },
      colors: {
        primary: '#348789',
        secondary: '#001489',
        gray: {
          50: '#DDDFEB',
          100: '#97909050',
          200: '#535653',
          300: '#7C8388',
        },
      },
      fontFamily: {
        sans: 'var(--font-poppins)',
      },
    },
  },
  plugins: [],
}

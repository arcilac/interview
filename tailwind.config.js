/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'light-background': 'hsl(0, 0%, 98%)', // Very Light Gray
        'light-elements': 'hsl(0, 0%, 100%)', // White
        'light-text': 'hsl(200, 15%, 8%)', // Very Dark Blue
        'light-input': 'hsl(0, 0%, 52%)', // Dark Gray

        // Dark mode
        'dark-background': 'hsl(207, 26%, 17%)', // Very Dark Blue
        'dark-elements': 'hsl(209, 23%, 22%)', // Dark Blue
        'dark-text': 'hsl(0, 0%, 100%)', // White
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      fontSize: {
        homepage: ['0.875rem', '1.5rem'], // 14px
        detail: ['1rem', '1.75rem'], // 16px
      },
      fontWeight: {
        light: 300,
        semibold: 600,
        extrabold: 800,
      },
      boxShadow: {
        light: '0 2px 4px hsla(0, 0%, 0%, 0.06)',
        dark: '0 2px 4px hsla(0, 0%, 0%, 0.2)',
        hover: '0 4px 12px hsla(0, 0%, 0%, 0.15)',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}

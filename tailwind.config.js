/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pp-neuebit': ['var(--font-pp-neuebit)'],
        'matrix-sans-screen': ['var(--font-matrix-sans-screen)'],
        'matrix-sans-raster': ['var(--font-matrix-sans-raster)'],
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1100px',
        '2xl': '1280px',
        '3xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'container': '1216px',
      },
    },
  },
  plugins: [],
}


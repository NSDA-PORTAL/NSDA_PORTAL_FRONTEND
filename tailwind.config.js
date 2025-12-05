/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom brand color
        'nsda-blue': '#004990', // Based on common NSDA branding
      },
    },
  },
  plugins: [],
}
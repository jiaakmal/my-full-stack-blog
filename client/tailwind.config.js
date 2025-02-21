// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add this line to include all JS, JSX, TS, and TSX files in the src directory
    // Add other paths if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
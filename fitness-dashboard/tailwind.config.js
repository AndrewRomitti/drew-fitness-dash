module.exports = {
  content: [
    './app/**/*.{ts,tsx}',     // if using app dir
    './pages/**/*.{ts,tsx}',   // if using pages dir
    './components/**/*.{ts,tsx}', // ⬅️ Needed for shadcn/ui to work
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

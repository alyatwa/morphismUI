import tailwindcss from 'tailwindcss'


export default {
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

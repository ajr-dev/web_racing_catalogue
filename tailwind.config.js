/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}',
    './node_modules/svelte-ux/**/*.{svelte,js}',
    './node_modules/layerchart/**/*.{svelte,js}',],
  theme: {
    extend: {},
  },
  plugins: [require('svelte-ux/plugins/tailwind.cjs')],
}


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['@electric-sql/pglite'], // force pre-bundling so Vite can handle it
//   },
//   build: {
//     rollupOptions: {
//       external: ['@electric-sql/pglite'], // make sure nothing is marked external, so it bundles everything
//     },
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['@electric-sql/pglite']
//   }
// })

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@electric-sql/pglite'],
  },
  build: {}
})




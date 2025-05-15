// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['@electric-sql/pglite'],
//   },
//   build: {
//     rollupOptions: {
//       external: ['@electric-sql/pglite']
//     }
//   }
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
  ],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'], // good to exclude to avoid pre-bundling issues
  },
  assetsInclude: ['**/*.wasm', '**/*.data'] // This tells Vite to treat these as assets
})




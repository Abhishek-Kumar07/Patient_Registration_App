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

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@electric-sql/pglite'], // force pre-bundling so Vite can handle it
  },
  build: {
    rollupOptions: {
      external: ['@electric-sql/pglite'], // make sure nothing is marked external, so it bundles everything
    },
  },
})





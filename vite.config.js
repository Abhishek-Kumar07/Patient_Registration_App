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



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['@electric-sql/pglite']
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@electric-sql/pglite'],  // pre-bundle this during dev for faster startup
  },
  build: {
    rollupOptions: {
      external: [],  // DON'T externalize @electric-sql/pglite (empty array to be safe)
      // or if needed, explicitly exclude only node built-ins like 'fs' if any,
      // but do NOT externalize @electric-sql/pglite here
    }
  }
})



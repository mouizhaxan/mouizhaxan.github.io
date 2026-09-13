import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match where the site is served from on GitHub Pages.
//
//   '/'            -> repo named <username>.github.io  (this is what we use)
//   '/portfolio/'  -> any other repo, served at <username>.github.io/portfolio/
//
// If you ever rename the repo away from <username>.github.io, change this one
// line to '/<repo-name>/' or every stylesheet and image will 404.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets-build',
  },
})

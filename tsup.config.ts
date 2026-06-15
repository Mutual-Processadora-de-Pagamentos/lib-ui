import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  // peerDeps não são empacotadas — o app fornece (react, lucide, etc).
  external: ['react', 'react-dom', 'lucide-react', 'clsx', 'tailwind-merge'],
})

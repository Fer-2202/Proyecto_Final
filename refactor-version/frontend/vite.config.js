import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),

      /* Alias de App */
      '@app': path.resolve(__dirname, 'src/app'),
      '@layouts': path.resolve(__dirname, 'src/app/layouts'),
      '@pages': path.resolve(__dirname, 'src/app/pages'),
      '@components': path.resolve(__dirname, 'src/app/components'),

      /* Alias de Config */
      '@config': path.resolve(__dirname, 'src/config'),
      '@context': path.resolve(__dirname, 'src/config/context'),
      '@data': path.resolve(__dirname, 'src/config/data'),
      '@hooks': path.resolve(__dirname, 'src/config/hooks'),
      '@services': path.resolve(__dirname, 'src/config/services'),

      /* Alias de Assets */
      '@assets': path.resolve(__dirname, 'src/assets'),

      /* Alias de Componentes de Shadcn/UI */
      '@shadcn/ui': path.resolve(__dirname, 'src/components/ui'),
      '@shadcn': path.resolve(__dirname, 'src/components/index.js'),
    },
  },
})

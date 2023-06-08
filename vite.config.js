import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'

export default () => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3001,
    },
  });
};

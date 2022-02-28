import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "assets": resolve(__dirname, "src/assets"),
    },
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [vue()]
})

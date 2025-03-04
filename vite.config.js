import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    // 允许 Railway 健康检查访问
    allowedHosts: ['healthcheck.railway.app', 'localhost']
  }
}); 
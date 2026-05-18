// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // 🔥 Включаем серверный рендеринг
  adapter: node({
    mode: 'standalone', // или 'middleware'
  }),
  // proxy можно убрать — он больше не нужен!
});
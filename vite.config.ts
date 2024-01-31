import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      name: 'shared',
      fileName: 'index',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
  },
  test: {
    include: ['test/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

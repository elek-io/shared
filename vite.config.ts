import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

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
  resolve: {
    /**
     * Add resolution behavior for Node.js to rollup
     *
     * @see https://github.com/rollup/plugins/tree/master/packages/node-resolve#exportconditions
     * @see https://github.com/uuidjs/uuid/issues/544
     */
    conditions: ['node'],
  },
  test: {
    include: ['test/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

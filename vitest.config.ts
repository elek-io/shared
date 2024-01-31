import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['dist/**/*'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

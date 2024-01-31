import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/util.test.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

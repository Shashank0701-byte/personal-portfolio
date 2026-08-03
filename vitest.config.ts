import { defineConfig } from 'vitest/config';

// Takes precedence over the leftover vite.config.ts from the pre-Next build, which
// pulls in @vitejs/plugin-react and is no longer installed. Scoped to lib/ — the
// analyzer's algorithm is pure TypeScript and needs no DOM environment.
export default defineConfig({
  test: {
    include: ['lib/**/*.test.ts'],
    environment: 'node',
  },
});

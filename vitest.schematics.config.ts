/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Dedicated Vitest project for the `ng add`/`ng update` schematics
 * (`packages/ng/schematics`).
 *
 * These specs drive `@angular-devkit`'s `SchematicTestRunner`, which loads the
 * migration factories through a native CommonJS `require` that bypasses Vite's
 * transform pipeline. They therefore run in a Node environment with a ts-node
 * loader registered in the setup file (see `vitest.schematics-setup.ts`), rather
 * than through the Angular/happy-dom pipeline used by the main project.
 */
export default defineConfig({
	root: __dirname,
	test: {
		name: 'schematics',
		watch: false,
		globals: true,
		environment: 'node',
		passWithNoTests: true,
		include: ['packages/**/schematics/**/*.spec.ts'],
		exclude: ['**/node_modules/**'],
		setupFiles: [join(__dirname, 'vitest.schematics-setup.ts')],
		env: { TZ: 'UTC' },
	},
});

/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Dedicated Vitest project for the skills generator (`scripts/generate-skills`).
 *
 * The generator had no test coverage at all — `scripts/**` was outside every project's `include`.
 * That is a large part of why TypeScript imports could be rendered inside ```css fences across
 * five skill variants unnoticed: no test asserted the shape of what the pipeline emits, and the
 * generated skills land in PRs of 30 000+ `linguist-generated` files where no human diff catches
 * anything.
 *
 * Plain Node environment: this code is Node scripting, with none of the Angular/happy-dom pipeline
 * the component specs need. Specs must only import the pure collectors/generators — never
 * `index.ts`, whose module body runs `main()`.
 */
export default defineConfig({
	root: __dirname,
	test: {
		name: 'generate-skills',
		watch: false,
		globals: true,
		environment: 'node',
		passWithNoTests: true,
		include: ['scripts/generate-skills/**/*.spec.ts'],
		exclude: ['**/node_modules/**'],
		env: { TZ: 'UTC' },
	},
	resolve: {
		alias: { '~generate-skills': join(__dirname, 'scripts/generate-skills') },
	},
});

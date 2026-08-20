/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

/**
 * Dedicated Vitest project for the VS Code extension's pure logic layer
 * (`packages/vscode-extension`).
 *
 * These are plain Node unit tests over text parsing, manifest indexing and
 * diagnostics — no Angular, no DOM, and deliberately no `vscode` import, which is
 * what makes them runnable outside an extension host at all. They therefore skip
 * the Angular/happy-dom pipeline the main project uses.
 *
 * They are named `*.test.ts` rather than `*.spec.ts` so the main project's glob
 * does not pick them up and try to run them through the Angular plugin.
 */
export default defineConfig({
	root: __dirname,
	test: {
		name: 'vscode-extension',
		watch: false,
		globals: true,
		environment: 'node',
		passWithNoTests: true,
		include: ['packages/vscode-extension/src/**/*.test.ts'],
		exclude: ['**/node_modules/**', '**/dist/**'],
	},
});

/// <reference types="vitest" />
import { mergeConfig } from 'vitest/config';

import { createBaseConfig } from './vitest.shared-config';

export default mergeConfig(createBaseConfig(__dirname), {
	root: __dirname,
	cacheDir: './node_modules/.vite',
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		projects: [
			{
				// Main project: Angular components/specs on happy-dom (inherits the
				// base plugins, setup files and environment from createBaseConfig).
				extends: true,
				test: {
					name: 'lucca-front',
					include: ['packages/**/*.spec.ts', 'packages/**/*.spec.*.ts', 'stories/**/*.spec.ts'],
					exclude: ['**/node_modules/**', '**/schematics/**/*.spec.ts'],
				},
			},
			// Schematics project: runs the `ng add`/`ng update` migration specs in a
			// Node environment with a ts-node loader (see vitest.schematics.config.ts).
			'./vitest.schematics.config.ts',
			{
				// Scripts project: offline build tooling (the LLM API-surface generator)
				// as plain ESM on Node — no Angular compiler, no browser environment.
				test: {
					name: 'scripts',
					include: ['scripts/**/*.test.mjs'],
					environment: 'node',
				},
			},
		],
	},
});

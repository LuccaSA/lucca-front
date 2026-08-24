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
				// API-docs scripts: pure Node ESM (ts-morph extraction + Markdown
				// renderers for the LLM API surface), no Angular runtime — a plain
				// Node environment, not the Angular base config.
				test: {
					name: 'api-docs',
					environment: 'node',
					include: ['scripts/api-docs/**/*.spec.mjs'],
				},
			},
		],
	},
});

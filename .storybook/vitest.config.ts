/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { storybookAngularVitest } from '@storybook/angular-vite/vitest';
import { join } from 'path';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(dirname, '..');

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default mergeConfig(
	defineConfig({
		define: {
			global: 'window',
		},
		test: {
			watch: false,
			fileParallelism: true,
			isolate: false,
			passWithNoTests: true,
			pool: 'threads',
			globals: true,
			env: {
				TZ: 'UTC',
			},
			setupFiles: [join(projectRoot, 'vitest.pre-setup.ts'), join(projectRoot, 'vitest.setup.ts')],
			reporters: ['default'],
		},
	}),
	{
		root: projectRoot,
		cacheDir: './node_modules/.vite',
		resolve: {
			tsconfigPaths: true,
		},
		test: {
			projects: [
				{
					extends: true,
					test: {
						name: 'lucca-front',
						exclude: ['**/node_modules/**', '**/schematics/**/*.spec.ts'],
					},
				},
				{
					extends: true,
					plugins: [
						// Forwards Angular build options (styles, assets, zoneless, …) into standalone vitest runs
						storybookAngularVitest({}),
						// The plugin will run tests for the stories defined in your Storybook config
						// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
						storybookTest({
							configDir: dirname,
							storybookScript: 'npm start --no-open',
						}),
					],
					test: {
						name: 'storybook',
						browser: {
							enabled: true,
							headless: true,
							provider: playwright({}),
							instances: [
								{
									browser: 'chromium',
								},
							],
						},
					},
				},
			],
		},
	},
);

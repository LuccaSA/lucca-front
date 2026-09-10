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
						// happy-dom environments are cheap to share between files.
						isolate: false,
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
						// Story files must not share a browser page: without isolation the DOM,
						// Angular apps, overlays and subscriptions of ~750 story files pile up in a
						// single tab until Chromium dies mid-run, and an async error thrown by one
						// story gets reported against whichever unrelated file is running.
						isolate: true,
						// The CI runner has 4 vCPUs; more concurrent pages than this starves the
						// workers and makes even static stories hit the test timeout.
						maxWorkers: 2,
						testTimeout: 30_000,
						// Last resort so a single browser-level flake doesn't red the whole build.
						retry: 1,
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

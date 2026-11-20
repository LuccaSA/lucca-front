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

// Scenario pages (product-like screens) and their tests run in their own `scenarios` project,
// with the global stylesheet of a consuming application instead of Storybook's (see scenarios/setup.ts).
const scenarioStories = ['stories/scenarios/**', 'stories/e2e/scenarios/**'];

// A fresh object per project: Vitest names the browser instances it is given after their project.
const chromium = () => ({
	enabled: true,
	headless: true,
	provider: playwright({}),
	instances: [
		{
			browser: 'chromium' as const,
		},
	],
});

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default mergeConfig(
	defineConfig({
		define: {
			global: 'window',
		},
		test: {
			watch: false,
			fileParallelism: true,
			// Must stay on the root config: the browser pool reads `isolate` from the root, not from
			// the project, so setting it per project silently leaves isolation on. Isolation would be
			// desirable — story files currently share one browser page, so the DOM, Angular apps,
			// overlays and subscriptions of ~750 files pile up in a single tab, and an async error
			// thrown by one story is reported against whichever unrelated file is running — but it
			// deadlocks the run: the per-file tester URL is not escaped, so any story under a
			// `html&css/` directory (311 of them) truncates it at the `&` and the tester never
			// reports back. Do not flip this before that is fixed upstream.
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
						exclude: ['**/node_modules/**', ...scenarioStories],
						// The CI runner has 4 vCPUs; more concurrent pages than this starves the workers
						// and makes even static stories hit the test timeout. Raise it if the suite gets
						// too slow and the runner gets bigger.
						maxWorkers: 2,
						testTimeout: 30_000,
						// Last resort so a single browser-level flake doesn't red the whole build.
						retry: 1,
						browser: chromium(),
					},
				},
				{
					extends: true,
					// Scenarios fail on axe violations, so axe-core is always loaded: pre-bundle it, or Vite
					// discovers it mid-run on a cold cache, reloads the page and fails the first stories.
					optimizeDeps: {
						include: ['axe-core'],
					},
					plugins: [
						storybookAngularVitest({}),
						storybookTest({
							configDir: dirname,
							storybookScript: 'npm start --no-open',
						}),
					],
					test: {
						name: 'scenarios',
						// storybookTest builds `include` from the `stories` globs of main.ts and ignores
						// `test.include`: excluding everything but the scenarios is the only way to scope it.
						exclude: ['**/node_modules/**', 'stories/documentation/**', 'stories/qa/**', 'stories/e2e/!(scenarios)/**'],
						setupFiles: [join(dirname, 'scenarios/setup.ts')],
						maxWorkers: 2,
						testTimeout: 30_000,
						// No retry: a scenario that only passes on its second run is a bug to look at.
						retry: 0,
						browser: chromium(),
					},
				},
			],
		},
	},
);

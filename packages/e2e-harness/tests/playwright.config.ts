import { defineConfig, devices } from '@playwright/test';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const storybookUrl = process.env['STORYBOOK_URL'] ?? 'http://localhost:6006';
const storybookPort = new URL(storybookUrl).port || '6006';
const isCi = !!process.env['CI'];

export default defineConfig({
	testDir: '.',
	// `.e2e.ts` and not `.spec.ts`: the Vitest projects pick up every `packages/**/*.spec.ts`.
	testMatch: '**/*.e2e.ts',
	// Traces and screenshots land where the repository already ignores Playwright output.
	outputDir: resolve(repositoryRoot, 'test-results', 'e2e-harness'),
	fullyParallel: true,
	// A story served by a dev Storybook is compiled on first request, which the default 30s does not
	// always cover when the workers hit a story the global setup has not warmed.
	timeout: 90_000,
	forbidOnly: isCi,
	retries: isCi ? 1 : 0,
	reporter: isCi ? [['list'], ['github']] : [['list']],
	use: {
		baseURL: storybookUrl,
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	// Compiles every story of the suite once, before the workers race those compilations.
	globalSetup: './global-setup.ts',
	webServer: {
		// The static build, like CI, and not the dev Storybook: a dev server compiles each story on
		// first request and re-transforms the module graph for every browser context, which the
		// workers cannot outrun — most of them end up waiting on a story that never renders.
		// Reused as is when a Storybook is already being served.
		command: `npm run build-storybook -- --quiet && npx --yes http-server storybook-static --port ${storybookPort} --silent`,
		cwd: repositoryRoot,
		// The preview route, not the root: a dev Storybook answers its manager long before it can
		// serve a story, and probing the root lets the suite start against a Storybook that is not
		// ready yet.
		url: `${storybookUrl}/iframe.html`,
		reuseExistingServer: true,
		// Covers building the Storybook from scratch before it is served.
		timeout: 900_000,
		// Without this the wait is completely silent, and a slow start is indistinguishable from a hang.
		stdout: 'pipe',
		stderr: 'pipe',
	},
});

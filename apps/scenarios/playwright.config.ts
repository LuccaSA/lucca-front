import { defineConfig, devices } from '@playwright/test';

const port = 4300;
const ci = !!process.env['CI'];

/**
 * Journeys of the scenarios app. Locally, they reuse a running `npm run start:scenarios`; on the CI,
 * they run against the production build, the one consuming applications ship.
 */
export default defineConfig({
	testDir: './e2e',
	outputDir: './test-results',
	fullyParallel: true,
	forbidOnly: ci,
	// A flaky journey is a bug to fix, not a run to retry
	retries: 0,
	reporter: ci ? [['github'], ['list'], ['html', { outputFolder: './playwright-report', open: 'never' }]] : [['list'], ['html', { outputFolder: './playwright-report', open: 'never' }]],
	use: {
		baseURL: `http://localhost:${port}`,
		locale: 'fr-FR',
		timezoneId: 'Europe/Paris',
		trace: 'retain-on-failure',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: `npx ng serve scenarios --port ${port} --configuration ${ci ? 'production' : 'development'}`,
		url: `http://localhost:${port}`,
		reuseExistingServer: !ci,
		timeout: 180_000,
	},
});

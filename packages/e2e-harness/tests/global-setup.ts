import { chromium, type FullConfig } from '@playwright/test';
import { ALL_STORIES } from './stories.js';
import { storyPath } from './story.js';

/**
 * Loads every story of the suite once, before the workers start.
 *
 * A dev Storybook answers as soon as it is up, but compiles a story's module graph only when that
 * story is first asked for. Without this warm-up the workers race those compilations in parallel
 * and time out together on an empty `#storybook-root` — which looks exactly like Storybook never
 * having started. Against the static build CI serves, this costs a couple of seconds and changes
 * nothing.
 */
export default async function globalSetup(config: FullConfig): Promise<void> {
	const baseURL = config.projects[0]?.use.baseURL;
	if (!baseURL) {
		throw new Error('No baseURL configured: the harness tests need a Storybook to run against.');
	}

	const browser = await chromium.launch();
	try {
		const page = await browser.newPage();
		for (const story of ALL_STORIES) {
			await page.goto(`${baseURL}${storyPath(story)}`, { timeout: 600_000, waitUntil: 'load' });
			// Storybook keeps the root hidden behind its loader until the story has actually rendered.
			await page.locator('#storybook-root').waitFor({ state: 'visible', timeout: 300_000 });
		}
	} finally {
		await browser.close();
	}
}

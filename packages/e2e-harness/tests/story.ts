import type { Page } from '@playwright/test';

/** The args a story can be opened with, the same way the Controls panel sets them. */
export type StoryArgs = Record<string, string | number | boolean>;

/** The isolated URL of a story, which is what every test navigates to. */
export function storyPath(storyId: string, args: StoryArgs = {}): string {
	const entries = Object.entries(args);
	// Built by hand rather than with URLSearchParams, whose encoding of `;` and `!` Storybook does not read back.
	const argsQuery = entries.length > 0 ? `&args=${entries.map(([name, value]) => `${name}:${encodeArgValue(value)}`).join(';')}` : '';
	return `/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story${argsQuery}`;
}

/**
 * Opens a Storybook story in isolation, which is where the harnesses are exercised against the
 * very markup the components ship.
 */
export async function openStory(page: Page, storyId: string, args: StoryArgs = {}): Promise<void> {
	await page.goto(storyPath(storyId, args));
	// Storybook keeps the root hidden behind its loader until the story has actually rendered,
	// so waiting for it to be visible is waiting for the component to be there.
	await page.locator('#storybook-root').waitFor({ state: 'visible' });
}

function encodeArgValue(value: string | number | boolean): string {
	if (typeof value === 'boolean') {
		return `!${value}`;
	}
	const encoded = String(value);
	if (/[;:,=&!+ ]/.test(encoded)) {
		throw new Error(`Story arg value "${encoded}" contains a character Storybook reads as a separator. Add a dedicated story instead.`);
	}
	return encoded;
}

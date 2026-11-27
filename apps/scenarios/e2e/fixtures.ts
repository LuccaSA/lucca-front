import AxeBuilder from '@axe-core/playwright';
import { test as base, expect, type Page } from '@playwright/test';

/**
 * `test` of the scenarios app: a journey fails on any `console.error` or uncaught error, since Angular
 * reports runtime errors (template errors, NG0xxx, errors thrown in subscriptions) through the console
 * and the journey would otherwise pass.
 */
export const test = base.extend<{ failOnConsoleErrors: void }>({
	failOnConsoleErrors: [
		async ({ page }, use) => {
			const errors: string[] = [];
			page.on('console', (message) => {
				if (message.type() === 'error') {
					errors.push(message.text());
				}
			});
			page.on('pageerror', (error) => errors.push(error.stack ?? error.message));
			await use();
			expect(errors, 'console.error or uncaught error during the journey').toEqual([]);
		},
		{ auto: true },
	],
});

export { expect };

/** A violation already reported on a component, tolerated until it is fixed: any other one still fails. */
export interface KnownAxeViolation {
	/** axe rule id */
	rule: string;
	/** CSS selector the offending element matches */
	selector: string;
	/** Why it happens, and where it is tracked */
	reason: string;
}

/**
 * `lu-main-layout` is a `role="main"` landmark, so the `<header>` of the page header it contains has no
 * banner role (HTML-AAM, and axe's own role computation), but the rule only skips headers inside a native
 * `<main>` element. Every page built on `lu-main-layout` gets it.
 */
export const mainLayoutBannerFalsePositive: KnownAxeViolation = {
	rule: 'landmark-banner-is-top-level',
	selector: 'lu-main-layout lu-page-header header',
	reason: 'axe false positive: the rule only skips headers inside a native <main>, not inside role="main"',
};

/**
 * Runs axe on the page, or on part of it, at any step of a journey: a dialog or a panel closed by the end
 * of the journey would never be audited otherwise.
 */
export async function expectNoAxeViolations(page: Page, options: { include?: string; knownViolations?: readonly KnownAxeViolation[] } = {}): Promise<void> {
	const { include, knownViolations = [] } = options;
	const builder = new AxeBuilder({ page });
	const { violations } = await (include ? builder.include(include) : builder).analyze();

	const unexpected: string[] = [];
	for (const violation of violations) {
		const knownSelectors = knownViolations.filter((known) => known.rule === violation.id).map((known) => known.selector);
		for (const node of violation.nodes) {
			const target = String(node.target.at(-1));
			if (!(await matchesOneOf(page, target, knownSelectors))) {
				unexpected.push(`${violation.id}: ${target}`);
			}
		}
	}
	expect(unexpected, 'axe violations').toEqual([]);
}

/** Whether the element axe reported matches one of the selectors of the known violations. */
async function matchesOneOf(page: Page, target: string, selectors: string[]): Promise<boolean> {
	if (selectors.length === 0) {
		return false;
	}
	return page
		.locator(target)
		.first()
		.evaluate((element, list) => list.some((selector) => element.matches(selector)), selectors);
}

/** Every `id` of the document is unique, so `aria-labelledby` and `aria-describedby` reach the right element. */
export async function expectUniqueIds(page: Page): Promise<void> {
	const duplicates = await page.evaluate(() => {
		const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
		return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
	});
	expect(duplicates, 'duplicate ids').toEqual([]);
}

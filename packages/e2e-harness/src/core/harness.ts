import type { Locator, Page } from '@playwright/test';

/**
 * Base class of every Lucca Front harness.
 *
 * A harness wraps the root element of one component instance and exposes its behaviour as
 * intentions — `selectOption`, `selectedLabel`, `isDisabled` — so that a test never has to know
 * which markup, class names or ARIA attributes the component happens to use today.
 */
export abstract class LuHarness {
	protected constructor(protected readonly host: Locator) {}

	/**
	 * The page the component lives in. Needed by the components that render part of themselves
	 * outside of their own root, in a CDK overlay.
	 */
	protected get page(): Page {
		return this.host.page();
	}

	/**
	 * The root element of the component, as a plain Playwright locator.
	 *
	 * This is the escape hatch: use it for what the harness does not cover yet (screenshots,
	 * bounding boxes, an assertion on a detail of the markup). Anything expressed through it is
	 * coupled to the component's DOM again, so prefer asking for a harness method instead.
	 */
	get locator(): Locator {
		return this.host;
	}
}

import type { Locator } from '@playwright/test';
import { LuHarness } from '../core/harness.js';
import type { LuHarnessText } from '../core/scope.js';
import { LuSelectOptionHarness } from './option.harness.js';

/** Both roles a Lucca select panel can take: `tree` once the select is fed a tree generator. */
export const LISTBOX_SELECTOR = '[role="listbox"], [role="tree"]';

/** The scroll container of the panel, which paginated data sources load more options into. */
const SCROLL_CONTAINER_SELECTOR = '.lu-select-panel-layout-content';

/**
 * The panel of a select, rendered in a CDK overlay at the end of the document rather than inside
 * the select itself. Obtained from `LuSelectHarness.panel()`, never built by hand.
 */
export class LuSelectPanelHarness extends LuHarness {
	constructor(host: Locator) {
		super(host);
	}

	/** Waits for the panel to be rendered and visible. */
	async waitForOpen(): Promise<void> {
		await this.#listbox().waitFor({ state: 'visible' });
	}

	/** Waits for the panel to leave the DOM, which closing a select overlay does. */
	async waitForClosed(): Promise<void> {
		await this.#listbox().waitFor({ state: 'detached' });
	}

	/** Whether the panel is waiting for its options, showing skeletons. */
	async isLoading(): Promise<boolean> {
		return (await this.#listbox().getAttribute('aria-busy')) === 'true';
	}

	/** Whether the panel has no option to offer, showing its empty state. */
	async isEmpty(): Promise<boolean> {
		return (await this.#listbox().getAttribute('aria-describedby')) !== null;
	}

	/**
	 * The message shown in place of the options while the panel is empty or loading, `null` when
	 * the panel is showing options.
	 */
	async statusMessage(): Promise<string | null> {
		const describedBy = await this.#listbox().getAttribute('aria-describedby');
		if (describedBy) {
			return (await this.host.locator(`[id="${describedBy}"]`).innerText()).trim();
		}
		if (await this.isLoading()) {
			// The loading message is only announced, so it is rendered visually hidden next to the skeletons.
			return (await this.#listbox().locator(':scope > .pr-u-mask').innerText()).trim();
		}
		return null;
	}

	/** One option of the panel, by its text. */
	option(label: LuHarnessText): LuSelectOptionHarness {
		return new LuSelectOptionHarness(this.#options(label));
	}

	/** Every option currently rendered, in display order. */
	async options(): Promise<LuSelectOptionHarness[]> {
		const options = await this.#options().all();
		return options.map((option) => new LuSelectOptionHarness(option));
	}

	/** The text of every option currently rendered, in display order. */
	async optionLabels(): Promise<string[]> {
		const labels = await this.#options().allInnerTexts();
		return labels.map((label) => label.trim());
	}

	/**
	 * Scrolls the panel to its last rendered option, which is how a paginated select is asked for
	 * its next page.
	 */
	async scrollToEnd(): Promise<void> {
		await this.host.locator(SCROLL_CONTAINER_SELECTOR).evaluate((element) => element.scrollTo(0, element.scrollHeight));
	}

	#listbox(): Locator {
		return this.host.locator(LISTBOX_SELECTOR).first();
	}

	#options(label?: LuHarnessText): Locator {
		const name = label === undefined ? undefined : { name: label };
		return this.host.getByRole('option', name).or(this.host.getByRole('treeitem', name));
	}
}

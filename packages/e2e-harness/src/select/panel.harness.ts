import type { Locator } from '@playwright/test';
import { LuHarness } from '../core/harness.js';
import type { LuHarnessText } from '../core/scope.js';
import { locateOptionValues, locateOptions, LuSelectOptionHarness } from './option.harness.js';

/** Both roles a Lucca select panel can take: `tree` once the select is fed a tree generator. */
export const LISTBOX_SELECTOR = '[role="listbox"], [role="tree"]';

/** The scroll container of the panel, which paginated data sources load more options into. */
const SCROLL_CONTAINER_SELECTOR = '.lu-select-panel-layout-content';

/** The top level of a tree panel, whose nodes nest the rest of the options inside themselves. */
const ROOT_OPTIONS_SELECTOR = ':scope > lu-tree-branch > lu-select-option > [role="treeitem"]';

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

	/** Whether the panel nests its options, which a select fed a tree generator does. */
	async isTree(): Promise<boolean> {
		return (await this.#listbox().getAttribute('role')) === 'tree';
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

	/** One option of the panel, by its own text — a tree node is not matched by its children's. */
	option(label: LuHarnessText): LuSelectOptionHarness {
		return new LuSelectOptionHarness(this.#options(label));
	}

	/**
	 * Every option currently rendered, in display order, a tree's nested ones included.
	 *
	 * The "add option" and "select all" rows are not options: they are driven by `addOption()` and
	 * `selectAll()` on the select itself.
	 */
	async options(): Promise<LuSelectOptionHarness[]> {
		const options = await this.#options().all();
		return options.map((option) => new LuSelectOptionHarness(option));
	}

	/**
	 * The options of a tree panel's top level, in display order, each holding its own children.
	 * Equivalent to `options()` on a panel that is not a tree.
	 */
	async rootOptions(): Promise<LuSelectOptionHarness[]> {
		if (!(await this.isTree())) {
			return this.options();
		}
		const roots = await this.#listbox().locator(ROOT_OPTIONS_SELECTOR).all();
		return roots.map((root) => new LuSelectOptionHarness(root));
	}

	/** The text of every option currently rendered, in display order. */
	async optionLabels(): Promise<string[]> {
		const labels = await locateOptionValues(this.#options()).allInnerTexts();
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
		return locateOptions(this.host, label);
	}
}

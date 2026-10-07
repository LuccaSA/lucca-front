import type { Locator } from '@playwright/test';
import { LuHarness } from '../core/harness.js';
import { readOptionLabel } from './option.harness.js';
import { LISTBOX_SELECTOR, LuSelectPanelHarness } from './panel.harness.js';

/** The control a select is driven by, whichever displayer renders it. */
const COMBOBOX_SELECTOR = '[role="combobox"]';

/** The CDK overlay the panel is rendered in, at the end of the document. */
const OVERLAY_PANE_SELECTOR = '.cdk-overlay-pane';

/**
 * The row a panel offers to make an option out of the current search, when its select is given an
 * `addOptionStrategy`. Its label is translated by the consumer, but both panels pin its id.
 */
const ADD_OPTION_SELECTOR = '[id="picker-content-add"]';

/**
 * What every Lucca select shares, whether it holds one value or several: a combobox to drive it
 * and a panel of options rendered in an overlay.
 */
export abstract class LuSelectHarness extends LuHarness {
	/** Whether the select refuses interaction. */
	async isDisabled(): Promise<boolean> {
		return this.combobox().isDisabled();
	}

	/** Whether the panel is currently open. */
	async isOpen(): Promise<boolean> {
		return (await this.combobox().getAttribute('aria-expanded')) === 'true';
	}

	/**
	 * Whether typing in the select filters its options. A select is searchable when its consumer
	 * listens to `clueChange`, not through an input of its own.
	 */
	async isSearchable(): Promise<boolean> {
		return !(await this.combobox().evaluate((element: HTMLInputElement) => element.readOnly));
	}

	/** Whether a clear button is offered right now, which needs the select both clearable and filled. */
	async canClear(): Promise<boolean> {
		return this.clearButton().isVisible();
	}

	/**
	 * Opens the panel and waits for it, doing nothing if it is already open.
	 *
	 * Clicks the select itself rather than the control it is driven by: a multi select lays its
	 * values over that control, which then takes no click at all. Every select opens from a click
	 * anywhere on itself, which is also what a user does.
	 */
	async open(): Promise<void> {
		if (await this.isOpen()) {
			return;
		}
		await this.host.click();
		await this.panel().waitForOpen();
	}

	/** Closes the panel and waits for it to be gone, doing nothing if it is already closed. */
	async close(): Promise<void> {
		if (!(await this.isOpen())) {
			return;
		}
		const panel = this.panel();
		await this.combobox().press('Escape');
		await panel.waitForClosed();
	}

	/**
	 * The panel of options.
	 *
	 * Only meaningful while this select's panel is open: the panel lives in a CDK overlay shared by
	 * the whole page, and opening a select closes any other one, so there is at most one at a time.
	 */
	panel(): LuSelectPanelHarness {
		return new LuSelectPanelHarness(this.page.locator(OVERLAY_PANE_SELECTOR).filter({ has: this.page.locator(LISTBOX_SELECTOR) }));
	}

	/**
	 * Opens the panel and types a search clue in the select.
	 *
	 * Filtering is the consumer's job — it happens in whatever `clueChange` is wired to — so this
	 * returns as soon as the clue is typed. Wait on the resulting options with a web-first
	 * assertion rather than assuming they are already there.
	 */
	async search(clue: string): Promise<void> {
		await this.open();
		await this.combobox().fill(clue);
	}

	/** Empties the select through its clear button. */
	async clear(): Promise<void> {
		await this.clearButton().click();
	}

	/**
	 * Whether the panel offers to make an option out of the current search. Opens the panel, which
	 * is where that row lives.
	 */
	async canAddOption(): Promise<boolean> {
		await this.open();
		return this.#addOptionRow().isVisible();
	}

	/**
	 * Makes an option out of `clue` and takes it, in one call: opens the panel, searches, then
	 * takes the row the panel offers. Called without a clue, takes that row as it stands.
	 *
	 * What the new option becomes is the consumer's business — the select only reports the clue
	 * through its `addOption` output — so wait on the value with a web-first assertion.
	 */
	async addOption(clue?: string): Promise<void> {
		if (clue === undefined) {
			await this.open();
		} else {
			await this.search(clue);
		}
		await this.#addOptionRow().click();
	}

	/**
	 * The text of the option the keyboard is currently on, `null` when none is. This is the option
	 * `Enter` would pick, and the one a screen reader announces.
	 */
	async highlightedOptionLabel(): Promise<string | null> {
		const activeDescendant = await this.combobox().getAttribute('aria-activedescendant');
		if (!activeDescendant) {
			return null;
		}
		return readOptionLabel(this.page.locator(`[id="${activeDescendant}"]`));
	}

	/** The add row, which the panel renders next to its options rather than among them. */
	#addOptionRow(): Locator {
		return this.panel().locator.locator(ADD_OPTION_SELECTOR);
	}

	/** The control driving the select, which the displayer of a multi select also carries. */
	protected combobox(): Locator {
		return this.host.locator(COMBOBOX_SELECTOR);
	}

	/**
	 * The clear button, which each select places in its own displayer. It carries a translated
	 * label, so it can only be anchored structurally.
	 */
	protected abstract clearButton(): Locator;
}

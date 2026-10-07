import type { Locator } from '@playwright/test';
import type { LuHarnessScope, LuHarnessText } from '../core/scope.js';
import { locateByLabel, locateByTestId } from '../select/locate.js';
import { locateOptionValues, locateSelectedOptions, matchesLabel } from '../select/option.harness.js';
import { LuSelectHarness } from '../select/select.harness.js';

const HOST_SELECTOR = 'lu-multi-select';

/**
 * Where the current values are displayed, one chip per value.
 *
 * The chips are `aria-hidden`: the values are announced through the hidden text the combobox is
 * labelled by, which holds them all in one block and cannot be read value by value. Reading them
 * apart therefore needs these class names.
 */
const VALUE_CHIP_SELECTOR = '.multipleSelect-displayer-chip';
const VALUE_CHIP_LABEL_SELECTOR = '.chip-content';

/** The last chip of a select given a `maxValuesShown`, holding the count of the values it hides. */
const OVERFLOW_CHIP_SELECTOR = `${VALUE_CHIP_SELECTOR}:not(:has(${VALUE_CHIP_LABEL_SELECTOR}))`;

/** The button each chip carries to drop its own value. */
const CHIP_REMOVE_SELECTOR = '.chip-kill';

const CLEAR_SELECTOR = '.multipleSelect-clear';

/**
 * The row a panel offers to take every option at once, when its select is given `withSelectAll`.
 *
 * The row exposes no state of its own — it is an `option` with neither `aria-selected` nor
 * `aria-checked` — so the checkbox it holds, which does, is what the state is read from.
 */
const SELECT_ALL_ROW_SELECTOR = '.multiSelectAllDisplayer';

/** A `lu-multi-select`: several values picked out of a panel whose options toggle. */
export class LuMultiSelectHarness extends LuSelectHarness {
	protected constructor(host: Locator) {
		super(host);
	}

	/**
	 * Finds a select by the label of the form field wrapping it.
	 *
	 * The label is matched as a substring, which also covers the select carrying its current
	 * values in its accessible name.
	 */
	static byLabel(scope: LuHarnessScope, label: LuHarnessText): LuMultiSelectHarness {
		return new LuMultiSelectHarness(locateByLabel(scope, HOST_SELECTOR, label));
	}

	/** Finds a select by a `data-testid` carried by the `lu-multi-select` element itself. */
	static byTestId(scope: LuHarnessScope, testId: string): LuMultiSelectHarness {
		return new LuMultiSelectHarness(locateByTestId(scope, HOST_SELECTOR, testId));
	}

	/** Wraps a select that was located by other means. */
	static from(host: Locator): LuMultiSelectHarness {
		return new LuMultiSelectHarness(host);
	}

	/** Whether the select holds at least one value. */
	async hasValue(): Promise<boolean> {
		return (await this.#valueChips().count()) > 0;
	}

	/**
	 * The text of every value the select displays, in display order.
	 *
	 * A select given a `maxValuesShown` displays only that many: the rest are reported by
	 * `hiddenValuesCount`.
	 */
	async selectedLabels(): Promise<string[]> {
		const labels = await this.#valueChips().locator(VALUE_CHIP_LABEL_SELECTOR).allInnerTexts();
		return labels.map((label) => label.trim());
	}

	/** How many values the select holds beyond the ones it displays, `0` when it shows them all. */
	async hiddenValuesCount(): Promise<number> {
		const overflow = this.host.locator(OVERFLOW_CHIP_SELECTOR);
		if ((await overflow.count()) === 0) {
			return 0;
		}
		return Number.parseInt((await overflow.innerText()).replace(/\D/g, ''), 10);
	}

	/**
	 * Adds an option to the value, doing nothing if it is already part of it. The panel stays
	 * open, as it does for a user picking several values in a row.
	 *
	 * On a tree select, a node is selected along with its whole subtree — `selectOnlyParent` and
	 * `selectOnlyChildren` on the option are the two other ways to pick it.
	 */
	async selectOption(label: LuHarnessText): Promise<void> {
		await this.#setOptionSelected(label, true);
	}

	/** Drops an option from the value through the panel, doing nothing if it is not part of it. */
	async deselectOption(label: LuHarnessText): Promise<void> {
		await this.#setOptionSelected(label, false);
	}

	/**
	 * Sets the value to exactly these options, in one call: drops whatever the select holds and
	 * the value does not ask for, then takes what is missing. Called with an empty list, empties
	 * the select.
	 *
	 * The resulting order is the select's own, not the order of the labels given — an option
	 * already held keeps its place. The panel stays open, as it does after any other pick.
	 *
	 * On a tree select a node still comes with its whole subtree, and a select driven by
	 * `withSelectAll` is better set through `selectAll`.
	 */
	async setValue(labels: LuHarnessText[]): Promise<void> {
		await this.open();
		for (const held of await this.#selectedOptionLabels()) {
			if (!labels.some((wanted) => matchesLabel(held, wanted))) {
				await this.deselectOption(held);
			}
		}
		for (const wanted of labels) {
			await this.selectOption(wanted);
		}
	}

	/** Toggles an option, whichever state it is in. */
	async toggleOption(label: LuHarnessText): Promise<void> {
		await this.open();
		await this.panel().option(label).click();
	}

	/** Drops a value through the button its chip carries, which needs no panel. */
	async removeValue(label: LuHarnessText): Promise<void> {
		await this.#valueChip(label).locator(CHIP_REMOVE_SELECTOR).click();
	}

	/**
	 * How much of the options the select holds, `null` when it offers no select-all row at all.
	 * Opens the panel, which is where that row lives.
	 *
	 * A select given `withSelectAll` holds a selection, not a list of values: `selectedLabels`
	 * reports what its displayer shows, this reports what the selection covers.
	 */
	async selectAllState(): Promise<'none' | 'some' | 'all' | null> {
		await this.open();
		const checkbox = this.#selectAllCheckbox();
		if (!(await checkbox.isVisible())) {
			return null;
		}
		if ((await checkbox.getAttribute('aria-checked')) === 'mixed') {
			return 'some';
		}
		return (await checkbox.isChecked()) ? 'all' : 'none';
	}

	/** Takes every option, in one call, whichever state the selection starts in. */
	async selectAll(): Promise<void> {
		const state = await this.selectAllState();
		if (state === 'all') {
			return;
		}
		if (state === 'some') {
			// A partial selection reads as checked, so the first click empties it: the second is
			// what takes it to all, exactly as it does for a user.
			await this.#selectAllCheckbox().click();
		}
		await this.#selectAllCheckbox().click();
	}

	protected override clearButton(): Locator {
		return this.host.locator(CLEAR_SELECTOR);
	}

	async #setOptionSelected(label: LuHarnessText, selected: boolean): Promise<void> {
		await this.open();
		const option = this.panel().option(label);
		if ((await option.isSelected()) === selected) {
			return;
		}
		await option.click();
	}

	/**
	 * The labels the value is currently made of, read off the panel: the select's own displayer
	 * shows only as many of them as it was given room for.
	 */
	async #selectedOptionLabels(): Promise<string[]> {
		const labels = await locateOptionValues(locateSelectedOptions(this.panel().locator)).allInnerTexts();
		return labels.map((label) => label.trim());
	}

	#selectAllCheckbox(): Locator {
		return this.panel().locator.locator(SELECT_ALL_ROW_SELECTOR).getByRole('checkbox');
	}

	#valueChips(): Locator {
		return this.host.locator(VALUE_CHIP_SELECTOR).filter({ has: this.page.locator(VALUE_CHIP_LABEL_SELECTOR) });
	}

	#valueChip(label: LuHarnessText): Locator {
		return this.#valueChips().filter({ has: this.page.locator(VALUE_CHIP_LABEL_SELECTOR, { hasText: label }) });
	}
}

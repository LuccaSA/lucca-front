import type { Locator } from '@playwright/test';
import type { LuHarnessScope, LuHarnessText } from '../core/scope.js';
import { locateByLabel, locateByTestId } from '../select/locate.js';
import { LuSelectHarness } from '../select/select.harness.js';

const HOST_SELECTOR = 'lu-simple-select';

/**
 * Where the current value is displayed. It has no role of its own — it is folded into the
 * accessible name of the combobox instead — so reading it needs this class.
 */
const VALUE_SELECTOR = '.simpleSelect-field-value';

const CLEAR_SELECTOR = '.simpleSelect-field-clear';

/** A `lu-simple-select`: one value picked out of a panel of options. */
export class LuSimpleSelectHarness extends LuSelectHarness {
	protected constructor(host: Locator) {
		super(host);
	}

	/**
	 * Finds a select by the label of the form field wrapping it.
	 *
	 * The label is matched as a substring, which also covers the select carrying its current value
	 * in its accessible name.
	 */
	static byLabel(scope: LuHarnessScope, label: LuHarnessText): LuSimpleSelectHarness {
		return new LuSimpleSelectHarness(locateByLabel(scope, HOST_SELECTOR, label));
	}

	/** Finds a select by a `data-testid` carried by the `lu-simple-select` element itself. */
	static byTestId(scope: LuHarnessScope, testId: string): LuSimpleSelectHarness {
		return new LuSimpleSelectHarness(locateByTestId(scope, HOST_SELECTOR, testId));
	}

	/** Wraps a select that was located by other means. */
	static from(host: Locator): LuSimpleSelectHarness {
		return new LuSimpleSelectHarness(host);
	}

	/** Whether the select holds a value. */
	async hasValue(): Promise<boolean> {
		return (await this.selectedLabel()) !== null;
	}

	/** The text of the current value, `null` when the select is empty. */
	async selectedLabel(): Promise<string | null> {
		const label = (await this.host.locator(VALUE_SELECTOR).innerText()).trim();
		return label.length > 0 ? label : null;
	}

	/**
	 * Picks an option by its text: opens the panel if needed, clicks the option, and waits for the
	 * panel to close as a simple select does on selection.
	 */
	async selectOption(label: LuHarnessText): Promise<void> {
		await this.open();
		const panel = this.panel();
		await panel.option(label).click();
		await panel.waitForClosed();
	}

	protected override clearButton(): Locator {
		return this.host.locator(CLEAR_SELECTOR);
	}
}

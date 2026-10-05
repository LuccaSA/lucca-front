import type { Locator } from '@playwright/test';
import { LuHarness } from '../core/harness.js';

/**
 * One option of a select panel.
 *
 * Every state is read from the ARIA contract of `lu-listbox-option`, which is also what a screen
 * reader goes through: a harness that stops seeing an option's state is a sign that the option
 * stopped exposing it to assistive technologies too.
 */
export class LuSelectOptionHarness extends LuHarness {
	constructor(host: Locator) {
		super(host);
	}

	/** The text of the option, as rendered by its option template. */
	async label(): Promise<string> {
		return (await this.host.innerText()).trim();
	}

	/** Whether the option is part of the current value. */
	async isSelected(): Promise<boolean> {
		return (await this.host.getAttribute('aria-selected')) === 'true';
	}

	/** Whether the option is partially selected, which only a tree select produces. */
	async isIndeterminate(): Promise<boolean> {
		return (await this.host.getAttribute('aria-checked')) === 'mixed';
	}

	/** Whether the option refuses selection. */
	async isDisabled(): Promise<boolean> {
		return (await this.host.getAttribute('aria-disabled')) === 'true';
	}

	/** Toggles the option. Prefer `selectOption` on the select itself, which also handles the panel. */
	async click(): Promise<void> {
		await this.host.click();
	}

	/** Waits for the option to be rendered, for a panel fed by a paginated data source. */
	async waitFor(): Promise<void> {
		await this.host.waitFor();
	}
}

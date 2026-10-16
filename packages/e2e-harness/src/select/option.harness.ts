import type { Locator } from '@playwright/test';
import { LuHarness } from '../core/harness.js';
import type { LuHarnessText } from '../core/scope.js';

/** Both roles an option takes, and the state that tells the ones holding the value. */
const OPTION_SELECTOR = '[role="option"], [role="treeitem"]';
const SELECTED_OPTION_SELECTOR = '[role="option"][aria-selected="true"], [role="treeitem"][aria-selected="true"]';

/**
 * The option's own label, as opposed to everything its element happens to contain.
 *
 * A tree option nests its children inside its own element, and renders the hidden — translated —
 * labels of its parent/children shortcuts next to its value, so reading the whole element picks
 * both up. Nothing accessible isolates the value, hence the class name.
 */
const VALUE_SELECTOR = ':scope > .listboxOption-content > .listboxOption-content-value';

/**
 * The option's own row.
 *
 * A tree option's element spans its whole subtree, so the centre of that element — where a click
 * lands — is one of its children. Clicking the row is clicking the option itself.
 */
const ROW_SELECTOR = ':scope > .listboxOption-content';

/** The children of a tree option, which it renders inside its own element. */
const CHILDREN_SELECTOR = ':scope > [role="group"] > lu-tree-branch > lu-select-option > [role="treeitem"]';

/** The two shortcuts a tree option with children offers, each labelled by hidden translated text. */
const ONLY_PARENT_SELECTOR = ':scope > .listboxOption-content .optionItem-icon.parentOnly';
const ONLY_CHILDREN_SELECTOR = ':scope > .listboxOption-content .optionItem-icon.childrenOnly';

/**
 * Reads the label of an option element.
 *
 * Its own value when it carries one, and everything it contains otherwise: the "add option" and
 * "select all" rows are options the keyboard can land on, but they hold no value.
 */
export async function readOptionLabel(option: Locator): Promise<string> {
	const value = option.locator(VALUE_SELECTOR);
	const target = (await value.count()) > 0 ? value.first() : option;
	return (await target.innerText()).trim();
}

/**
 * Every option of a panel that carries a value, optionally filtered on that value.
 *
 * Carrying a value is what makes an option one: a panel gives the same role to its "add option"
 * and "select all" rows, which are actions — `addOption()` and `selectAll()` on the select drive
 * those.
 *
 * The filter is on the option's own value and not on its accessible name, which a tree option
 * folds its whole subtree into: anchoring on the name would make a parent match any of its
 * children.
 */
export function locateOptions(scope: Locator, label?: LuHarnessText): Locator {
	const value = scope.page().locator(VALUE_SELECTOR, label === undefined ? {} : { hasText: label });
	return scope.locator(OPTION_SELECTOR).filter({ has: value });
}

/**
 * The options currently part of the value.
 *
 * Read off the panel rather than off the select's own displayer, which shows only as many values
 * as it was given room for.
 */
export function locateSelectedOptions(scope: Locator): Locator {
	return scope.locator(SELECTED_OPTION_SELECTOR).filter({ has: scope.page().locator(VALUE_SELECTOR) });
}

/**
 * Whether a label is the one a harness was asked for, the way Playwright matches text: a string
 * is trimmed, lowercased and looked for anywhere in the label, a regular expression is tested.
 */
export function matchesLabel(label: string, matcher: LuHarnessText): boolean {
	if (typeof matcher === 'string') {
		return label.toLowerCase().includes(matcher.trim().toLowerCase());
	}
	return matcher.test(label);
}

/** The value of each of the given options, in display order. */
export function locateOptionValues(options: Locator): Locator {
	return options.locator(VALUE_SELECTOR);
}

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

	/** The text of the option, as rendered by its option template, without its children's. */
	async label(): Promise<string> {
		return readOptionLabel(this.host);
	}

	/** Whether the option is part of the current value. */
	async isSelected(): Promise<boolean> {
		return (await this.host.getAttribute('aria-selected')) === 'true';
	}

	/**
	 * Whether the option is partially selected.
	 *
	 * Reads the `aria-checked="mixed"` of `lu-listbox-option`, which a listbox consumer sets by
	 * hand: no Lucca select produces it today — a tree parent whose children are partly selected
	 * stays `aria-selected="false"`.
	 */
	async isIndeterminate(): Promise<boolean> {
		return (await this.host.getAttribute('aria-checked')) === 'mixed';
	}

	/** Whether the option refuses selection. */
	async isDisabled(): Promise<boolean> {
		return (await this.host.getAttribute('aria-disabled')) === 'true';
	}

	/** Whether this option is a tree node holding other options. */
	async hasChildren(): Promise<boolean> {
		return (await this.#children().count()) > 0;
	}

	/**
	 * The options nested one level under this one, in display order, empty for a leaf or for any
	 * option of a panel that is not a tree.
	 */
	async children(): Promise<LuSelectOptionHarness[]> {
		const children = await this.#children().all();
		return children.map((child) => new LuSelectOptionHarness(child));
	}

	/**
	 * Toggles the option. Prefer the select's own `selectOption`, which also handles the panel —
	 * and, on a multi select, selects a tree node's whole subtree along with it.
	 */
	async click(): Promise<void> {
		await this.host.locator(ROW_SELECTOR).click();
	}

	/**
	 * Selects this tree node alone, leaving its children out, through the shortcut a multi select
	 * offers on a node with children.
	 */
	async selectOnlyParent(): Promise<void> {
		await this.host.locator(ONLY_PARENT_SELECTOR).click();
	}

	/** Selects this tree node's whole subtree but not the node itself, through the same shortcut. */
	async selectOnlyChildren(): Promise<void> {
		await this.host.locator(ONLY_CHILDREN_SELECTOR).click();
	}

	/** Waits for the option to be rendered, for a panel fed by a paginated data source. */
	async waitFor(): Promise<void> {
		await this.host.waitFor();
	}

	#children(): Locator {
		return this.host.locator(CHILDREN_SELECTOR);
	}
}

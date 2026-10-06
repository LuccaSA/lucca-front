import type { Locator } from '@playwright/test';
import type { LuHarnessScope, LuHarnessText } from '../core/scope.js';

/**
 * Locates a select by the label of the form field wrapping it.
 *
 * `getByLabel` resolves to the labelled control, which Lucca selects render inside their own root:
 * filtering the roots on it is what ties a label to its select, without ever walking the DOM
 * upwards from the input.
 */
export function locateByLabel(scope: LuHarnessScope, hostSelector: string, label: LuHarnessText): Locator {
	return scope.locator(hostSelector).filter({ has: scope.getByLabel(label) });
}

/**
 * Locates a select by a `data-testid` carried by the select element itself.
 *
 * The intersection fails loudly when the attribute sits on a wrapper instead, which is the case
 * `from()` is for.
 */
export function locateByTestId(scope: LuHarnessScope, hostSelector: string, testId: string): Locator {
	return scope.getByTestId(testId).and(scope.locator(hostSelector));
}

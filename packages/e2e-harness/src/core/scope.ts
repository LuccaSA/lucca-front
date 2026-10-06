import type { Locator } from '@playwright/test';

/**
 * The querying subset shared by Playwright's `Page` and `Locator`.
 *
 * Every harness factory takes one: hand it a `Page` to search the whole document, or a `Locator`
 * to restrict the search to a subtree (a dialog, a form section, a table row…).
 */
export type LuHarnessScope = Pick<Locator, 'locator' | 'getByRole' | 'getByLabel' | 'getByTestId'>;

/**
 * A text matcher, accepted everywhere a harness takes a label.
 *
 * Strings are matched the Playwright way: case-insensitive, whitespace-trimmed, and as a
 * substring. Harnesses never ask for an exact match, because several Lucca components fold the
 * current value into the accessible name of their control.
 */
export type LuHarnessText = string | RegExp;

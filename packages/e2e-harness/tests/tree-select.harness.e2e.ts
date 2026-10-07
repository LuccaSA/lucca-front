import { expect, test } from '@playwright/test';
import { LuMultiSelectHarness, LuSimpleSelectHarness } from '../src/index.js';
import { SIMPLE_SELECT_FIELD_STORY, TREE_MULTI_SELECT_STORY, TREE_SIMPLE_SELECT_STORY } from './stories.js';
import { openStory } from './story.js';

/** The stories group the legumes by colour, which leaves one root per colour. */
const ROOTS = ['Artichaut', 'Aubergine', 'Betterave', 'Carotte', 'Champignon', 'Maïs', 'Pomme de terre'];

/** A small subtree, away from the long list of green legumes. */
const PARENT = 'Carotte';
const CHILDREN = ['Citrouille', 'Potimarron'];

test.describe('tree select', () => {
	test('reports a panel whose options are nested', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		expect(await select.panel().isTree()).toBe(true);
	});

	test('reports a panel whose options are not', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.open();

		expect(await select.panel().isTree()).toBe(false);
	});

	test('lists the top level of the tree, each node holding its own children', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		const roots = await select.panel().rootOptions();
		const labels = await Promise.all(roots.map((root) => root.label()));
		expect(labels).toEqual(ROOTS);

		const children = await select.panel().option(PARENT).children();
		expect(await Promise.all(children.map((child) => child.label()))).toEqual(CHILDREN);
	});

	test('tells a node with children from a leaf', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		expect(await select.panel().option(PARENT).hasChildren()).toBe(true);
		expect(await select.panel().option(CHILDREN[0]).hasChildren()).toBe(false);
		expect(await select.panel().option(CHILDREN[0]).children()).toEqual([]);
	});

	test('reads a node label without the subtree it contains', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		// A node renders its children, and the hidden labels of its own shortcuts, inside its own
		// element: reading the element whole would hand back all three.
		expect(await select.panel().option(PARENT).label()).toBe(PARENT);

		const labels = await select.panel().optionLabels();
		expect(labels).toContain(PARENT);
		expect(labels).toContain(CHILDREN[0]);
		expect(labels.every((label) => !label.includes('\n'))).toBe(true);
	});

	test('reports the node the keyboard is on, and not its subtree', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();
		await select.locator.getByRole('combobox').press('ArrowDown');

		expect(await select.highlightedOptionLabel()).not.toContain(CHILDREN[0]);
	});

	test('selects a node along with its whole subtree', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.selectOption(PARENT);

		await expect.poll(() => select.selectedLabels()).toEqual([PARENT, ...CHILDREN]);
	});

	test('selects a node alone', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();
		await select.panel().option(PARENT).selectOnlyParent();

		await expect.poll(() => select.selectedLabels()).toEqual([PARENT]);
	});

	test('selects a node subtree without the node', async ({ page }) => {
		await openStory(page, TREE_MULTI_SELECT_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();
		await select.panel().option(PARENT).selectOnlyChildren();

		await expect.poll(() => select.selectedLabels()).toEqual(CHILDREN);
	});

	test('picks a nested option in a simple select, which holds one value', async ({ page }) => {
		await openStory(page, TREE_SIMPLE_SELECT_STORY);
		const select = LuSimpleSelectHarness.from(page.locator('lu-simple-select'));

		await select.selectOption(CHILDREN[1]);

		// Polled, not read once: the overlay is gone before the combobox has caught up with it.
		await expect.poll(() => select.isOpen()).toBe(false);
		await expect.poll(() => select.selectedLabel()).toBe(CHILDREN[1]);
	});
});

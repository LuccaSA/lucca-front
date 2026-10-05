import { expect, test } from '@playwright/test';
import { LuSimpleSelectHarness } from '../src/index.js';
import { SIMPLE_SELECT_BARE_STORY, SIMPLE_SELECT_DISABLED_OPTIONS_STORY, SIMPLE_SELECT_FIELD_STORY } from './stories.js';
import { openStory } from './story.js';

/** The story starts on the first legume and offers all of them. */
const INITIAL_VALUE = 'Artichaut';

test.describe('LuSimpleSelectHarness', () => {
	test('finds a select by the label of its form field and reads its value', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await expect.poll(() => select.selectedLabel()).toBe(INITIAL_VALUE);
		await expect.poll(() => select.hasValue()).toBe(true);
	});

	test('opens and closes the panel', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		expect(await select.isOpen()).toBe(false);

		await select.open();
		expect(await select.isOpen()).toBe(true);

		await select.close();
		expect(await select.isOpen()).toBe(false);
	});

	test('lists the options of the panel in display order', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.open();

		const labels = await select.panel().optionLabels();
		expect(labels.slice(0, 3)).toEqual(['Artichaut', 'Asperge', 'Aubergine']);
	});

	test('reports which option holds the current value', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.open();

		expect(await select.panel().option(INITIAL_VALUE).isSelected()).toBe(true);
		expect(await select.panel().option('Carotte').isSelected()).toBe(false);
		expect(await select.panel().option('Carotte').isDisabled()).toBe(false);
	});

	test('selects an option, which closes the panel', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.selectOption('Carotte');

		expect(await select.isOpen()).toBe(false);
		await expect.poll(() => select.selectedLabel()).toBe('Carotte');
	});

	test('clears the value', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		expect(await select.canClear()).toBe(true);

		await select.clear();

		await expect.poll(() => select.selectedLabel()).toBeNull();
		await expect.poll(() => select.hasValue()).toBe(false);
		await expect.poll(() => select.canClear()).toBe(false);
	});

	test('filters the options through the search', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		expect(await select.isSearchable()).toBe(true);

		await select.search('Carot');

		await expect.poll(() => select.panel().optionLabels()).toEqual(['Carotte']);
	});

	test('reports the empty state of the panel and its message', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.search('zzz');

		await expect.poll(() => select.panel().isEmpty()).toBe(true);
		expect(await select.panel().optionLabels()).toEqual([]);
		expect(await select.panel().statusMessage()).not.toBe('');
	});

	test('reports the loading state of the panel', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_BARE_STORY, { loading: true });
		const select = LuSimpleSelectHarness.from(page.locator('lu-simple-select'));

		await select.open();

		await expect.poll(() => select.panel().isLoading()).toBe(true);
		expect(await select.panel().statusMessage()).not.toBe('');
	});

	test('reports an option that refuses selection', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_DISABLED_OPTIONS_STORY);
		const select = LuSimpleSelectHarness.from(page.locator('lu-simple-select'));

		await select.open();

		const labels = await select.panel().optionLabels();
		const disabled = await Promise.all((await select.panel().options()).map((option) => option.isDisabled()));
		expect(disabled.some(Boolean)).toBe(true);
		expect(disabled.every(Boolean)).toBe(false);
		expect(labels).toHaveLength(disabled.length);
	});

	test('reports the option the keyboard is on', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.open();
		expect(await select.highlightedOptionLabel()).toBe(INITIAL_VALUE);

		await select.locator.getByRole('combobox').press('ArrowDown');
		await expect.poll(() => select.highlightedOptionLabel()).toBe('Asperge');
	});

	test('scrolls the panel to its end', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY);
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await select.open();
		const scroller = select.panel().locator.locator('.lu-select-panel-layout-content');
		expect(await scroller.evaluate((element) => element.scrollTop)).toBe(0);

		await select.panel().scrollToEnd();

		expect(await scroller.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
	});

	test('reports a disabled select', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_FIELD_STORY, { disabled: true });
		const select = LuSimpleSelectHarness.byLabel(page, 'Label');

		await expect.poll(() => select.isDisabled()).toBe(true);
	});
});

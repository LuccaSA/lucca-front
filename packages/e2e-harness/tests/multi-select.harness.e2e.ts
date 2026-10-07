import { expect, test } from '@playwright/test';
import { LuMultiSelectHarness } from '../src/index.js';
import { MULTI_SELECT_BARE_STORY, MULTI_SELECT_DISABLED_OPTIONS_STORY, MULTI_SELECT_FIELD_STORY } from './stories.js';
import { openStory } from './story.js';

/** The two values the disabled-options story starts on. */
const INITIAL_VALUES = ['Artichaut', 'Asperge'];

test.describe('LuMultiSelectHarness', () => {
	test('finds a select by the label of its form field, which starts empty', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await expect.poll(() => select.hasValue()).toBe(false);
		expect(await select.selectedLabels()).toEqual([]);
	});

	test('reads the values a select starts on', async ({ page }) => {
		await openStory(page, MULTI_SELECT_DISABLED_OPTIONS_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await expect.poll(() => select.selectedLabels()).toEqual(INITIAL_VALUES);
		await expect.poll(() => select.hasValue()).toBe(true);
	});

	test('adds several values in a row, the panel staying open', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await select.selectOption('Carotte');
		await select.selectOption('Betterave');

		expect(await select.isOpen()).toBe(true);
		await expect.poll(() => select.selectedLabels()).toEqual(['Carotte', 'Betterave']);
	});

	test('leaves a value alone when it is already selected', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await select.selectOption('Carotte');
		await select.selectOption('Carotte');

		await expect.poll(() => select.selectedLabels()).toEqual(['Carotte']);
	});

	test('drops a value through the panel', async ({ page }) => {
		await openStory(page, MULTI_SELECT_DISABLED_OPTIONS_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.deselectOption('Artichaut');

		await expect.poll(() => select.selectedLabels()).toEqual(['Asperge']);

		// Already dropped: a second call is a no-op rather than a toggle back on.
		await select.deselectOption('Artichaut');
		await expect.poll(() => select.selectedLabels()).toEqual(['Asperge']);
	});

	test('toggles an option whichever state it is in', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await select.toggleOption('Carotte');
		await expect.poll(() => select.selectedLabels()).toEqual(['Carotte']);

		await select.toggleOption('Carotte');
		await expect.poll(() => select.selectedLabels()).toEqual([]);
	});

	test('sets the value to exactly the options it is given', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await select.setValue(['Carotte', 'Betterave']);

		await expect.poll(() => select.selectedLabels()).toEqual(['Carotte', 'Betterave']);
	});

	test('drops what the new value does not ask for, keeping the select own order', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await select.setValue(['Carotte', 'Betterave']);
		await select.setValue(['Radis', 'Betterave']);

		// `Betterave` was already held, so it keeps its place: the order is the select's, not the
		// one the labels were given in.
		await expect.poll(() => select.selectedLabels()).toEqual(['Betterave', 'Radis']);
	});

	test('empties the select when given no option at all', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		await select.setValue(['Carotte', 'Betterave']);
		await select.setValue([]);

		await expect.poll(() => select.selectedLabels()).toEqual([]);
	});

	test('sets the value of a select that displays only part of it', async ({ page }) => {
		await openStory(page, MULTI_SELECT_BARE_STORY, { maxValuesShown: 2 });
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.setValue(['Artichaut', 'Asperge', 'Aubergine']);
		await expect.poll(() => select.hiddenValuesCount()).toBe(1);

		// The value it drops is one the displayer never showed, so the state has to come from the
		// panel rather than from the chips.
		await select.setValue(['Artichaut']);

		await expect.poll(() => select.selectedLabels()).toEqual(['Artichaut']);
		await expect.poll(() => select.hiddenValuesCount()).toBe(0);
	});

	test('drops a value through the button its chip carries', async ({ page }) => {
		await openStory(page, MULTI_SELECT_DISABLED_OPTIONS_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.removeValue('Artichaut');

		await expect.poll(() => select.selectedLabels()).toEqual(['Asperge']);
	});

	test('reports which options hold the current value', async ({ page }) => {
		await openStory(page, MULTI_SELECT_DISABLED_OPTIONS_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		expect(await select.panel().option('Artichaut').isSelected()).toBe(true);
		expect(await select.panel().option('Carotte').isSelected()).toBe(false);
	});

	test('reports an option that refuses selection', async ({ page }) => {
		await openStory(page, MULTI_SELECT_DISABLED_OPTIONS_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		// The story disables every other option: `Asperge` is the second one.
		expect(await select.panel().option('Asperge').isDisabled()).toBe(true);
		expect(await select.panel().option('Artichaut').isDisabled()).toBe(false);
	});

	test('counts the values it does not display', async ({ page }) => {
		await openStory(page, MULTI_SELECT_BARE_STORY, { maxValuesShown: 2 });
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		expect(await select.hiddenValuesCount()).toBe(0);

		await select.selectOption('Artichaut');
		await select.selectOption('Asperge');
		await select.selectOption('Aubergine');

		await expect.poll(() => select.selectedLabels()).toEqual(['Artichaut', 'Asperge']);
		await expect.poll(() => select.hiddenValuesCount()).toBe(1);
	});

	test('clears every value at once', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		expect(await select.canClear()).toBe(false);

		await select.selectOption('Carotte');
		await select.close();

		await expect.poll(() => select.canClear()).toBe(true);
		await select.clear();

		await expect.poll(() => select.selectedLabels()).toEqual([]);
		await expect.poll(() => select.canClear()).toBe(false);
	});

	test('filters the options through the search', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		expect(await select.isSearchable()).toBe(true);

		await select.search('Carot');

		await expect.poll(() => select.panel().optionLabels()).toEqual(['Carotte']);
	});

	test('opens and closes the panel', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		expect(await select.isOpen()).toBe(false);

		await select.open();
		expect(await select.isOpen()).toBe(true);

		await select.close();
		expect(await select.isOpen()).toBe(false);
	});
});

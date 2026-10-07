import { expect, test } from '@playwright/test';
import { LuMultiSelectHarness, LuSimpleSelectHarness } from '../src/index.js';
import { MULTI_SELECT_ADD_OPTION_STORY, MULTI_SELECT_FIELD_STORY, MULTI_SELECT_SELECT_ALL_STORY, SIMPLE_SELECT_ADD_OPTION_STORY } from './stories.js';
import { openStory } from './story.js';

/** A name no legume of the stories carries, so the search only leaves the add row behind. */
const NEW_OPTION = 'Rutabaga';

test.describe('add option', () => {
	test('reports a select that offers no add row', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		expect(await select.canAddOption()).toBe(false);
	});

	test('reports the row a panel offers', async ({ page }) => {
		await openStory(page, MULTI_SELECT_ADD_OPTION_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		expect(await select.canAddOption()).toBe(true);
	});

	test('makes an option out of the search and takes it, in one call', async ({ page }) => {
		await openStory(page, SIMPLE_SELECT_ADD_OPTION_STORY);
		const select = LuSimpleSelectHarness.from(page.locator('lu-simple-select'));

		await select.addOption(NEW_OPTION);

		await expect.poll(() => select.selectedLabel()).toBe(NEW_OPTION);
	});

	test('adds an option to a multi select the same way', async ({ page }) => {
		await openStory(page, MULTI_SELECT_ADD_OPTION_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.addOption(NEW_OPTION);

		await expect.poll(() => select.selectedLabels()).toEqual([NEW_OPTION]);
	});

	test('leaves the add row out of the options', async ({ page }) => {
		await openStory(page, MULTI_SELECT_ADD_OPTION_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		const options = await select.panel().options();
		const labels = await select.panel().optionLabels();
		expect(labels).toHaveLength(options.length);
		expect(labels.some((label) => label.startsWith('Ajouter'))).toBe(false);
	});
});

test.describe('select all', () => {
	test('reports a select that offers no select-all row', async ({ page }) => {
		await openStory(page, MULTI_SELECT_FIELD_STORY);
		const select = LuMultiSelectHarness.byLabel(page, 'Label');

		expect(await select.selectAllState()).toBeNull();
	});

	test('takes every option in one call', async ({ page }) => {
		await openStory(page, MULTI_SELECT_SELECT_ALL_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		expect(await select.selectAllState()).toBe('none');

		await select.selectAll();

		await expect.poll(() => select.selectAllState()).toBe('all');
	});

	test('takes every option from a partial selection, in one call too', async ({ page }) => {
		await openStory(page, MULTI_SELECT_SELECT_ALL_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.selectAll();
		await select.deselectOption('Artichaut');
		await expect.poll(() => select.selectAllState()).toBe('some');

		await select.selectAll();

		await expect.poll(() => select.selectAllState()).toBe('all');
	});

	test('leaves the select-all row out of the options', async ({ page }) => {
		await openStory(page, MULTI_SELECT_SELECT_ALL_STORY);
		const select = LuMultiSelectHarness.from(page.locator('lu-multi-select'));

		await select.open();

		const options = await select.panel().options();
		const labels = await select.panel().optionLabels();
		expect(labels).toHaveLength(options.length);
		expect(labels).not.toContain('Tout sélectionner');
	});
});

import { createScenarioTestStory, withConsumerStylesheet } from '@/helpers/scenarios';
import meta, { Basic } from '@/scenarios/environment/environment.stories';
import { expect, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Scenarios/Environment',
	tags: ['scenario', '!autodocs'],
};

export const BasicTEST = createScenarioTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);

	await step('Angular runs like a consuming application', async () => {
		await expect(canvas.getByTestId('change-detection')).toHaveTextContent('zone.js');
		await expect(canvas.getByTestId('select-responsive-dialog')).toHaveTextContent('false');
	});

	await step('The product palette of the scenario replaces the default one', async () => {
		const rootStyle = getComputedStyle(document.documentElement);
		await expect(rootStyle.getPropertyValue('--palettes-product-700')).toBe(rootStyle.getPropertyValue('--palettes-poplee-700'));
		await expect(rootStyle.getPropertyValue('--palettes-product-700')).not.toBe(rootStyle.getPropertyValue('--palettes-brand-700'));
	});

	// The Storybook UI loads the `main-all` stylesheet, which styles every component
	if (!withConsumerStylesheet()) {
		return;
	}

	await step('The consumer global stylesheet is loaded', async () => {
		const spacing = getComputedStyle(document.documentElement).getPropertyValue('--pr-t-spacings-100');
		await expect(spacing.trim()).not.toBe('');
	});

	await step('A component only gets the style its Angular component brings', async () => {
		const callout = canvas.getByTestId('component-without-its-style');
		await expect(getComputedStyle(callout).paddingBlockStart).toBe('0px');
	});
});

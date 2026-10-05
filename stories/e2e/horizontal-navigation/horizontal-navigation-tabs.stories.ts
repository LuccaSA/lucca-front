import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/navigation/horizontal-navigation/angular/horizontal-navigation-tabs.stories';

export default {
	...meta,
	title: 'E2E/HorizontalNavigation',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const tablist = canvas.getByRole('tablist');
		await expect(tablist).toBeVisible();
		const tabs = canvas.getAllByRole('tab');
		await expect(tabs.length).toBe(4);
	});

	await step('Clic sur un onglet', async () => {
		const tabs = canvas.getAllByRole('tab');
		await userEvent.click(tabs[1]);
		await waitForAngular();
		await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
	});

	await step('Navigation clavier entre les onglets', async () => {
		const tabs = canvas.getAllByRole('tab');
		tabs[0].focus();
		await expect(tabs[0]).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
	});
});

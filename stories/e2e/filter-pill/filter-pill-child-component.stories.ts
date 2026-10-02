import { createTestStory } from '@/helpers/stories';
import { findPanelOptions, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/filter-pill-child-component.stories';

export default {
	...meta,
	title: 'E2E/FilterPill/ChildComponent',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Test inner select/ });
	const queryClearer = () => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('The pill picks up the select declared in a child component', async () => {
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('combobox')).toBeVisible();
	});

	let optionText = '';
	await step('Selecting an option fills the pill with the custom displayer', async () => {
		const [option] = await findPanelOptions();
		optionText = option.innerText;
		await userEvent.click(option);
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));
		await expect(pill).toHaveTextContent(optionText);
		await expect(queryClearer()).toBeVisible();
	});

	await step('Clearing the pill empties the select of the child component', async () => {
		await userEvent.click(queryClearer());
		await waitForAngular();
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(queryClearer()).not.toBeInTheDocument();
	});
});

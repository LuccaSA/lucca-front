import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/listbox-option/angular/add-option.stories';

export default {
	...meta,
	title: 'E2E/ListboxOption/AddOption',
	tags: ['!autodocs'],
};

const getAddOption = (canvasElement: HTMLElement) => within(canvasElement).getByRole('option', { name: /Ajouter une option/ });

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	await step('The add option is an option without selection state', async () => {
		const addOption = getAddOption(canvasElement);
		await expect(addOption).toHaveClass('mod-add');
		await expect(addOption).not.toHaveAttribute('aria-selected');
	});

	await step('The add option displays a plus icon', async () => {
		await expect(getAddOption(canvasElement).querySelector('.lucca-icon')).toHaveClass('icon-mathsPlus');
	});
});

export const MultipleTEST = createTestStory({ ...Basic, name: 'Multiple', args: { ...Basic.args, multiple: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	await step('The add option has no checkbox, unlike the other options', async () => {
		await expect(getAddOption(canvasElement).querySelector('.checkboxField')).not.toBeInTheDocument();
		const option1 = within(canvasElement).getByText('option 1').closest('[role="option"]');
		await expect(option1.querySelector('.checkboxField')).toBeInTheDocument();
	});
});

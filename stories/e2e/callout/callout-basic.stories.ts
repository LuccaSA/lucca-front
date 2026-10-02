import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Template } from '@/stories/feedback/callout/angular/callout-basic.stories';

export default {
	...meta,
	title: 'E2E/Callout',
	tags: ['!autodocs'],
};

export const TemplateTEST = createTestStory({ ...Template, args: { ...Template.args, removable: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const callout = canvasElement.querySelector('lu-callout');
		await expect(callout).toBeInTheDocument();
		await expect(canvas.getByText('Feedback description')).toBeVisible();
	});

	await step('Vérifie le bouton de fermeture (removable)', async () => {
		const closeButton = canvas.getByRole('button');
		await expect(closeButton).toBeVisible();
	});

	await step('Interaction souris - fermeture du callout', async () => {
		const closeButton = canvas.getByRole('button');
		await userEvent.click(closeButton);
		await waitForAngular();
		await expect(canvasElement.querySelector('.callout')).not.toBeInTheDocument();
	});
});

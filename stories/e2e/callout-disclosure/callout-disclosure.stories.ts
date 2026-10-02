import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent } from 'storybook/test';
import meta, { Template } from '@/stories/feedback/callout-disclosure/angular/callout-disclosure.stories';

export default {
	...meta,
	title: 'E2E/CalloutDisclosure',
	tags: ['!autodocs'],
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();

	await step('Vérifie le rendu initial (fermé)', async () => {
		const summary = canvasElement.querySelector('summary');
		await expect(summary).toBeVisible();
		const details = canvasElement.querySelector('details');
		await expect(details).not.toHaveAttribute('open');
	});

	await step('Interaction souris - ouverture', async () => {
		const summary = canvasElement.querySelector('summary');
		await userEvent.click(summary);
		await waitForAngular();
		const details = canvasElement.querySelector('details');
		await expect(details).toHaveAttribute('open');
	});

	await step('Interaction souris - fermeture', async () => {
		const summary = canvasElement.querySelector('summary');
		await userEvent.click(summary);
		await waitForAngular();
		const details = canvasElement.querySelector('details');
		await expect(details).not.toHaveAttribute('open');
	});

	// We have issues with keyboard interactions testing in general
	// await step('Interaction clavier - ouverture avec Entrée', async () => {
	// 	const summary = canvasElement.querySelector('summary');
	// 	summary.focus();
	// 	await expect(summary).toHaveFocus();
	// 	await userEvent.keyboard('{Enter}');
	// 	await waitForAngular();
	// 	const details = canvasElement.querySelector('details');
	// 	await expect(details).toHaveAttribute('open');
	// });
	//
	// await step('Interaction clavier - fermeture avec Entrée', async () => {
	// 	const summary = canvasElement.querySelector('summary');
	// 	summary.focus();
	// 	await userEvent.keyboard('{Enter}');
	// 	await waitForAngular();
	// 	const details = canvasElement.querySelector('details');
	// 	await expect(details).not.toHaveAttribute('open');
	// });
});

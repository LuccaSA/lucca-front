import { createTestStory } from '@/helpers/stories';
import { sleep, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Template } from '@/stories/feedback/callout-popover/angular/callout-popover.stories';

export default {
	...meta,
	title: 'E2E/CalloutPopover',
	tags: ['!autodocs'],
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Interaction souris - ouverture du popover', async () => {
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await sleep(500);
		const popoverContent = screen.getByRole('list');
		await expect(popoverContent).toBeVisible();
	});

	await step('Interaction souris - fermeture du popover', async () => {
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await sleep(500);
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	await step('Interaction clavier - ouverture avec Entrée', async () => {
		const button = canvas.getByRole('button');
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await sleep(500);
		const popoverContent = screen.getByRole('list');
		await expect(popoverContent).toBeVisible();
	});

	await step('Interaction clavier - fermeture avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await sleep(500);
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});
});

import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Modal } from '@/stories/overlays/modal/modal.stories';

export default {
	...meta,
	title: 'E2E/Modal',
	tags: ['!autodocs'],
};

export const ModalTEST = createTestStory(Modal, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Ouvre la modale', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
	});

	await step('Ferme avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});

export const ModalSubmitTEST = createTestStory(Modal, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	const openModal = async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
		await waitForAngular();
		return within(screen.getByRole('dialog'));
	};

	await step('Le bouton de submit est visible dans la modale', async () => {
		const dialog = await openModal();
		await expect(dialog.getByRole('button', { name: 'Ok' })).toBeVisible();
		await expect(dialog.getByRole('button', { name: 'Annuler' })).toBeVisible();
	});

	await step('Le clic sur submit ferme la modale', async () => {
		const dialog = within(screen.getByRole('dialog'));
		await userEvent.click(dialog.getByRole('button', { name: 'Ok' }));
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	await step('Le submit est déclenchable au clavier (Enter)', async () => {
		const dialog = await openModal();
		const submitButton = dialog.getByRole('button', { name: 'Ok' });
		submitButton.focus();
		await expect(submitButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});

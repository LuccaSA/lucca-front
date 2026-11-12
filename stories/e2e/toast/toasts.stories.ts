import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/overlays/toasts/toasts.stories';
import { expect, userEvent, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Toast',
	tags: ['!autodocs'],
};

// Toasts have no role of their own: each one is identified by its close button.
const CLOSE_LABEL = 'Fermer';

function getCloseButtons(canvasElement: HTMLElement): HTMLElement[] {
	return within(canvasElement).queryAllByRole('button', { name: CLOSE_LABEL });
}

function getToast(closeButton: HTMLElement): HTMLElement {
	const toast = closeButton.closest<HTMLElement>('.toasts-item');
	if (!toast) {
		throw new Error('The close button is not inside a toast.');
	}
	return toast;
}

/**
 * `LuToastsService` is provided in root and outlives the story: toasts added by a previous test
 * are still displayed when the next one starts, so they are closed first.
 */
async function closeAllToasts(canvasElement: HTMLElement): Promise<void> {
	for (const closeButton of getCloseButtons(canvasElement)) {
		await userEvent.click(closeButton);
	}
	await waitForAngular();
	await expect(getCloseButtons(canvasElement)).toHaveLength(0);
}

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	await closeAllToasts(canvasElement);

	await step('Renders an empty polite live region', async () => {
		const liveRegion = canvasElement.querySelector('.toasts');
		await expect(liveRegion).toHaveAttribute('aria-live', 'polite');
		await expect(liveRegion).toBeEmptyDOMElement();
	});

	await step('Mouse - adds a toast in the live region', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Toast' }));
		await waitForAngular();

		const closeButtons = getCloseButtons(canvasElement);
		await expect(closeButtons).toHaveLength(1);
		const toast = getToast(closeButtons[0]);
		await expect(toast).toBeVisible();
		await expect(canvasElement.querySelector('.toasts')).toContainElement(toast);
	});

	await step('Mouse - the close button removes the toast', async () => {
		await userEvent.click(canvas.getByRole('button', { name: CLOSE_LABEL }));
		await waitForAngular();
		await expect(getCloseButtons(canvasElement)).toHaveLength(0);
	});

	await step('Keyboard - Enter on a trigger adds a toast', async () => {
		const trigger = canvas.getByRole('button', { name: 'Toast success' });
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();

		const closeButtons = getCloseButtons(canvasElement);
		await expect(closeButtons).toHaveLength(1);
		await expect(getToast(closeButtons[0])).toHaveClass('palette-success');
	});

	await step('Keyboard - Enter on the close button removes the toast', async () => {
		const closeButton = canvas.getByRole('button', { name: CLOSE_LABEL });
		closeButton.focus();
		await expect(closeButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(getCloseButtons(canvasElement)).toHaveLength(0);
	});

	await step('Stacks several toasts and closes only the targeted one', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Toast warning' }));
		await userEvent.click(canvas.getByRole('button', { name: 'Toast sans auto kill' }));
		await waitForAngular();

		const closeButtons = getCloseButtons(canvasElement);
		await expect(closeButtons).toHaveLength(2);
		await expect(getToast(closeButtons[0])).toHaveClass('palette-warning');

		await userEvent.click(closeButtons[0]);
		await waitForAngular();

		const remaining = getCloseButtons(canvasElement);
		await expect(remaining).toHaveLength(1);
		await expect(getToast(remaining[0])).not.toHaveClass('palette-warning');
	});

	await closeAllToasts(canvasElement);
});

export const SourcesTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	await closeAllToasts(canvasElement);

	await step('Displays the toasts emitted by a source', async () => {
		// "Toast error" pushes into the observable given to `[sources]`, not to `LuToastsService.addToast()`.
		await userEvent.click(canvas.getByRole('button', { name: 'Toast error' }));
		await waitForAngular();

		const closeButtons = getCloseButtons(canvasElement);
		await expect(closeButtons).toHaveLength(1);
		await expect(getToast(closeButtons[0])).toHaveClass('palette-error');
	});

	await closeAllToasts(canvasElement);
});

export const TemplateTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	await closeAllToasts(canvasElement);

	await step('Renders a template as the toast message', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Toast avec template' }));
		await waitForAngular();

		const closeButtons = getCloseButtons(canvasElement);
		await expect(closeButtons).toHaveLength(1);
		await expect(within(getToast(closeButtons[0])).getByRole('button', { name: 'Toast avec button' })).toBeVisible();
	});

	await step('Keeps the template interactive', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Toast avec button' }));
		await waitForAngular();
		await expect(getCloseButtons(canvasElement)).toHaveLength(2);
	});

	await closeAllToasts(canvasElement);
});

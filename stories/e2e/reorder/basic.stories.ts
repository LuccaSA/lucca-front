import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { getItems, getMenu, handleName } from './reorder.helpers';
import meta, { Basic } from '@/stories/listings/reorder/angular/basic.stories';
import { expect, userEvent, waitFor, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Reorder/Basic',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const list = canvas.getByRole('list');

	await step('Renders a labelled handle for each item', async () => {
		await expect(getItems(list)).toEqual(['Carotte', 'Poireau', 'Navet', 'Courgette']);
		const handle = canvas.getByRole('button', { name: handleName('Carotte') });
		await expect(handle).toHaveAttribute('type', 'button');
		await expect(handle).toHaveAttribute('aria-keyshortcuts', 'Alt+ArrowUp Alt+ArrowLeft Alt+ArrowDown Alt+ArrowRight Alt+Home Alt+PageUp Alt+End Alt+PageDown');
	});

	await step('Alt + ArrowDown moves the item down and keeps the focus on its handle', async () => {
		canvas.getByRole('button', { name: handleName('Carotte') }).focus();
		await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');
		await waitForAngular();
		await expect(getItems(list)).toEqual(['Poireau', 'Carotte', 'Navet', 'Courgette']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Carotte') })).toHaveFocus());
	});

	await step('Alt + ArrowUp moves the item back up', async () => {
		await userEvent.keyboard('{Alt>}{ArrowUp}{/Alt}');
		await waitForAngular();
		await expect(getItems(list)).toEqual(['Carotte', 'Poireau', 'Navet', 'Courgette']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Carotte') })).toHaveFocus());
	});

	await step('Alt + ArrowUp on the first item does nothing', async () => {
		await userEvent.keyboard('{Alt>}{ArrowUp}{/Alt}');
		await waitForAngular();
		await expect(getItems(list)).toEqual(['Carotte', 'Poireau', 'Navet', 'Courgette']);
	});

	await step('Enter opens the handle menu and Escape closes it', async () => {
		const handle = canvas.getByRole('button', { name: handleName('Carotte') });
		handle.focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(handle).toHaveAttribute('aria-expanded', 'true');
		const menu = within(getMenu(handle));
		await expect(menu.queryByRole('button', { name: /Déplacer plus haut/ })).not.toBeInTheDocument();
		await expect(menu.queryByRole('button', { name: /^Déplacer en premier/ })).not.toBeInTheDocument();
		await expect(menu.getByRole('button', { name: /Déplacer plus bas/ })).toBeEnabled();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(handle).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Clicking the handle opens its menu, "Déplacer en dernier" moves the item to the end', async () => {
		const handle = canvas.getByRole('button', { name: handleName('Poireau') });
		await userEvent.click(handle);
		await waitForAngular();
		await expect(handle).toHaveAttribute('aria-expanded', 'true');
		await userEvent.click(within(getMenu(handle)).getByRole('button', { name: /^Déplacer en dernier/ }));
		await waitForAngular();
		await expect(getItems(list)).toEqual(['Carotte', 'Navet', 'Courgette', 'Poireau']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Poireau') })).toHaveFocus());
	});
});

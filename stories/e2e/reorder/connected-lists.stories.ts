import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { getItems, getMenu, handleName } from './reorder.helpers';
import meta, { ConnectedLists } from '@/stories/listings/reorder/angular/connected-lists.stories';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Reorder/ConnectedLists',
	tags: ['!autodocs'],
};

export const ConnectedListsTEST = createTestStory(ConnectedLists, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const [todo, greenhouse, doing, done] = canvas.getAllByRole('list');

	await step('Renders the columns', async () => {
		await expect(getItems(todo)).toEqual(['Carotte', 'Poireau', 'Navet']);
		await expect(getItems(greenhouse)).toEqual(['Tomate']);
		await expect(getItems(doing)).toEqual(['Courgette', 'Potiron']);
		await expect(getItems(done)).toEqual(['Radis']);
	});

	await step('The menu offers to move the item to each other column', async () => {
		const handle = canvas.getByRole('button', { name: handleName('Carotte') });
		await userEvent.click(handle);
		await waitForAngular();
		await expect(handle).toHaveAttribute('aria-expanded', 'true');
		const menu = within(getMenu(handle));
		await expect(menu.getByRole('button', { name: /Déplacer vers « En pousse »/ })).toBeVisible();
		await expect(menu.getByRole('button', { name: /Déplacer vers « Récolte »/ })).toBeVisible();
		await expect(menu.queryByRole('button', { name: /Déplacer vers « Semis »/ })).not.toBeInTheDocument();
		await expect(menu.getByRole('button', { name: /Déplacer vers « Serre »/ })).toBeVisible();
	});

	await step('Moves the item to the same position in the chosen column and focuses its handle', async () => {
		const handle = canvas.getByRole('button', { name: handleName('Carotte') });
		await userEvent.click(within(getMenu(handle)).getByRole('button', { name: /Déplacer vers « En pousse »/ }));
		await waitForAngular();
		await expect(getItems(todo)).toEqual(['Poireau', 'Navet']);
		await expect(getItems(doing)).toEqual(['Carotte', 'Courgette', 'Potiron']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Carotte') })).toHaveFocus());
	});

	await step('Alt + ArrowLeft moves the item to the previous column', async () => {
		canvas.getByRole('button', { name: handleName('Carotte') }).focus();
		await userEvent.keyboard('{Alt>}{ArrowLeft}{/Alt}');
		await waitForAngular();
		await expect(getItems(greenhouse)).toEqual(['Carotte', 'Tomate']);
		await expect(getItems(doing)).toEqual(['Courgette', 'Potiron']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Carotte') })).toHaveFocus());
		await userEvent.keyboard('{Alt>}{ArrowRight}{/Alt}');
		await waitForAngular();
		await expect(getItems(doing)).toEqual(['Carotte', 'Courgette', 'Potiron']);
	});

	await step('Keyboard: Enter opens the menu of the moved item, which now offers its former column', async () => {
		const handle = canvas.getByRole('button', { name: handleName('Carotte') });
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(handle).toHaveAttribute('aria-expanded', 'true');
		const menu = within(getMenu(handle));
		await expect(menu.getByRole('button', { name: /Déplacer vers « Semis »/ })).toBeVisible();
		await expect(menu.queryByRole('button', { name: /Déplacer vers « En pousse »/ })).not.toBeInTheDocument();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(handle).toHaveAttribute('aria-expanded', 'false');
		await expect(screen.queryByRole('button', { name: /Déplacer vers « Semis »/ })).not.toBeInTheDocument();
	});

	await step('Alt + ArrowDown moves the item within its new column', async () => {
		canvas.getByRole('button', { name: handleName('Carotte') }).focus();
		await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');
		await waitForAngular();
		await expect(getItems(doing)).toEqual(['Courgette', 'Carotte', 'Potiron']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Carotte') })).toHaveFocus());
	});

	await step('Alt + ArrowRight moves the item to the same position in the next column', async () => {
		await userEvent.keyboard('{Alt>}{ArrowRight}{/Alt}');
		await waitForAngular();
		await expect(getItems(doing)).toEqual(['Courgette', 'Potiron']);
		await expect(getItems(done)).toEqual(['Radis', 'Carotte']);
		await waitFor(() => expect(canvas.getByRole('button', { name: handleName('Carotte') })).toHaveFocus());
	});
});

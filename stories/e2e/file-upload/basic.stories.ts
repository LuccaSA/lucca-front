import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import meta, { Multi, Single } from '@/stories/forms/file-upload/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/FileUpload',
	tags: ['!autodocs'],
};

// The mock upload service answers after 2.5s
const UPLOAD_TIMEOUT = { timeout: 5000 };

const createImage = (name: string) => new File(['x'.repeat(1500)], name, { type: 'image/png' });

const getFileInput = (canvasElement: HTMLElement) => canvasElement.querySelector<HTMLInputElement>('input[type="file"]');

const getEntries = (canvasElement: HTMLElement) => Array.from(canvasElement.querySelectorAll('.fileEntry'));

// The file name is surrounded by non-breaking spaces
const deleteButtonName = (fileName: string) => new RegExp(`Supprimer le fichier\\s«\\s${fileName.replace('.', '\\.')}\\s»`);

const dragAndDropPlay = async (canvasElement: HTMLElement) => {
	const input = getFileInput(canvasElement);
	const fileUpload = input.closest('.fileUpload');
	await fireEvent.dragEnter(input);
	await waitForAngular();
	await expect(fileUpload).toHaveClass('is-droppable');
	await fireEvent.dragLeave(input);
	await waitForAngular();
	await expect(fileUpload).not.toHaveClass('is-droppable');
};

export const MultiTEST = createTestStory(Multi, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('The file input exposes its contract', async () => {
		const input = getFileInput(canvasElement);
		await expect(input).toHaveAttribute('multiple');
		await expect(input).toHaveAccessibleName('Label');
		// Colons are preceded by non-breaking spaces in French
		await expect(canvas.getByText(/Poids maximum pour un fichier\s:\s5Mo\./)).toBeInTheDocument();
	});

	await step('Dragging a file over the field highlights it', async () => {
		await dragAndDropPlay(canvasElement);
	});

	await step('Picking files adds a loading entry for each of them', async () => {
		// The Multi story does not forward its accept arg, so the input gets the invalid "*" token: browsers
		// ignore it, but user-event would reject every file with it
		await userEvent.setup({ applyAccept: false }).upload(getFileInput(canvasElement), [createImage('first.png'), createImage('second.png')]);
		await waitForAngular();
		const entries = getEntries(canvasElement);
		await expect(entries).toHaveLength(2);
		for (const entry of entries) {
			await expect(entry).toHaveClass('is-loading');
		}
		await expect(canvas.getByText('first.png')).toBeInTheDocument();
		await expect(canvas.getByText('second.png')).toBeInTheDocument();
	});

	await step('The entries switch to success once uploaded', async () => {
		await waitFor(() => expect(getEntries(canvasElement).every((entry) => entry.classList.contains('is-success'))).toBe(true), UPLOAD_TIMEOUT);
		await expect(canvas.getAllByText('Fichier PNG')).toHaveLength(2);
		await expect(canvas.getAllByText('1,5ko')).toHaveLength(2);
	});

	await step('The field stays available to pick more files', async () => {
		await expect(getFileInput(canvasElement)).toBeInTheDocument();
	});

	await step('An entry can be deleted with the keyboard', async () => {
		canvas.getByRole('button', { name: deleteButtonName('first.png') }).focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(canvas.queryByText('first.png')).not.toBeInTheDocument();
		await expect(getEntries(canvasElement)).toHaveLength(1);
	});

	await step('An entry can be deleted with the mouse', async () => {
		await userEvent.click(canvas.getByRole('button', { name: deleteButtonName('second.png') }));
		await waitForAngular();
		await expect(getEntries(canvasElement)).toHaveLength(0);
	});
});

export const SingleTEST = createTestStory(Single, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('The file input exposes its contract', async () => {
		const input = getFileInput(canvasElement);
		await expect(input).not.toHaveAttribute('multiple');
		await expect(input).toHaveAttribute('accept', 'image/*');
		await expect(input).toHaveAccessibleName('Label');
		// Colons are preceded by non-breaking spaces in French
		await expect(canvas.getByText(/Formats acceptés\s:\stous les formats d’images\./)).toBeInTheDocument();
		await expect(canvas.getByText(/Poids maximum\s:\s5Mo\./)).toBeInTheDocument();
	});

	await step('Dragging a file over the field highlights it', async () => {
		await dragAndDropPlay(canvasElement);
	});

	await step('Picking a file replaces the field with its entry', async () => {
		await userEvent.upload(getFileInput(canvasElement), createImage('invoice.png'));
		await waitForAngular();
		await expect(getFileInput(canvasElement)).not.toBeInTheDocument();
		const [entry] = getEntries(canvasElement);
		await expect(entry).toHaveClass('is-loading');
		await expect(entry).toHaveClass('mod-L');
		await expect(canvas.getByText('invoice.png')).toBeInTheDocument();
	});

	await step('The entry switches to success once uploaded', async () => {
		await waitFor(() => expect(getEntries(canvasElement)[0]).toHaveClass('is-success'), UPLOAD_TIMEOUT);
	});

	await step('Deleting the entry gives the field back', async () => {
		canvas.getByRole('button', { name: deleteButtonName('invoice.png') }).focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(getEntries(canvasElement)).toHaveLength(0);
		await expect(getFileInput(canvasElement)).toBeInTheDocument();
	});
});

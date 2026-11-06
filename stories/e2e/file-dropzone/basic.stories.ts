import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, fireEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/file-dropzone/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/FileDropzone',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const dropzone = canvasElement.querySelector('.fileUpload.mod-dropzone');

	await step('The dropzone displays the default instructions', async () => {
		await expect(canvas.getByText(/Formats acceptés\s:\stous\./)).toBeInTheDocument();
		await expect(canvas.getByText(/Poids maximum pour un fichier\s:\s80Mo\./)).toBeInTheDocument();
	});

	await step('Dragging a file over the dropzone highlights it', async () => {
		await fireEvent.dragEnter(dropzone);
		await waitForAngular();
		await expect(dropzone).toHaveClass('is-droppable');
		await fireEvent.dragLeave(dropzone);
		await waitForAngular();
		await expect(dropzone).not.toHaveClass('is-droppable');
	});
});

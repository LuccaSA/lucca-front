import { provideHttpClient } from '@angular/common/http';
import { FileDropzoneComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, fireEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/File/FileDropzone/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [FileDropzoneComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<lu-file-dropzone />`,
			styles: [`:host { display: block; min-block-size: 23rem }`],
		};
	},
} as Meta;

export const Basic = {
	args: {},
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

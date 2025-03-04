import { provideHttpClient } from '@angular/common/http';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUploaded/Angular/Basic',
	argTypes: {
		size: {
			options: ['S', null],
			control: {
				type: 'radio',
			},
		},
		state: {
			options: [null, 'loading', 'error'],
			control: {
				type: 'radio',
			},
		},
		format: {
			options: ['file', 'word', 'excel', 'powerpoint'],
			control: {
				type: 'radio',
			},
		},
		display: {
			options: [null, 'media', 'single'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FileEntryComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<lu-file-uploaded ${generateInputs(args, argTypes)} />`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		size: null,
		fileSize: 28420,
		fileType: 'image/png',
		fileName: 'dummyimage.png',
		filePreviewUrl: 'https://dummyimage.com/500',
		state: null,
		display: null,
		downloadable: false,
		deletable: true,
		viewable: false,
		format: 'file',
		inlineMessageError: 'Virus contenu dans le fichier sélectionné.',
		withPassword: false,
	},
};

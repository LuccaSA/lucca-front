import { provideHttpClient } from '@angular/common/http';
import { FileUploadedComponent } from '@lucca-front/ng/fileUpload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUpload/Angular/File',
	argTypes: {
		size: {
			options: ['S', 'M'],
			control: {
				type: 'radio',
			},
		},
		state: {
			options: ['loading', 'success', 'critical'],
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
	},
	decorators: [
		moduleMetadata({
			imports: [FileUploadedComponent],
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
		size: 'M',
		fileSize: 28420,
		fileType: 'image/png',
		fileName: 'dummyimage.png',
		filePreviewUrl: 'https://dummyimage.com/500',
		fileUrl: 'https://dummyimage.com/5000',
		state: 'success',
		typeMedia: false,
		downloadable: false,
		deletable: true,
	},
};

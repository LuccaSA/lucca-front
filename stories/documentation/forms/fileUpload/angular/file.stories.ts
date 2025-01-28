import { provideHttpClient } from '@angular/common/http';
import { FileUploadedComponent } from '@lucca-front/ng/fileUploaded';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUpload/Angular/File',
	argTypes: {
		size: {
			options: [null, 'S', 'L'],
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
			options: ['img', 'file', 'word', 'excel', 'powerpoint'],
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
		size: null,
		format: 'img',
		state: 'success',
	},
};

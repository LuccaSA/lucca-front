import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@lucca-front/ng/fileUpload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUpload/Angular/Basic',
	argTypes: {
		size: {
			options: ['S', 'M'],
			control: {
				type: 'radio',
			},
		},
		state: {
			options: [null, 'loading', 'critical'],
			control: {
				type: 'radio',
			},
		},

		multiple: {
			control: {
				type: 'boolean',
			},
		},
		disablePreview: {
			control: {
				type: 'boolean',
			},
		},
		fileMaxWeight: {
			control: {
				type: 'number',
			},
		},
		accept: {
			control: {
				type: 'object',
			},
		},
		typeMedia: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FileUploadComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { accept, ...mainArgs } = args;

		return {
			props: {
				accept,
			},
			template: `<lu-file-upload ${generateInputs(mainArgs, argTypes)} [accept]="accept"/>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		size: 'M',
		state: null,
		multiple: false,
		typeMedia: false,
		accept: [
			{
				format: '.jpg',
				name: 'JPG',
			},
			{
				format: '.jpeg',
			},
			{
				format: '.png',
				name: 'PNG',
			},
			{
				format: '.gif',
				name: 'GIF',
			},
		],
		fileMaxWeight: 5000000,
		disablePreview: false,
	},
};

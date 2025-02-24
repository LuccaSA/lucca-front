import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUpload/Angular/Basic',
	argTypes: {
		size: {
			options: ['S', null],
			control: {
				type: 'radio',
			},
		},
		illustration: {
			options: ['paper', 'picture'],
			control: {
				type: 'select',
			},
		},
		displayMedia: {
			if: { arg: 'multiple', truthy: true },
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
		size: null,
		multiple: false,
		displayMedia: false,
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
			{
				format: '.svg',
				name: 'SVG',
			},
		],
		fileMaxSize: 5000000,
		disablePreview: false,
		illustration: 'paper',
	},
};

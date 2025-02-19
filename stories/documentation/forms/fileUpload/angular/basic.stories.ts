import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@lucca-front/ng/fileUpload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUpload/Angular/Basic',
	argTypes: {
		small: {
			control: {
				type: 'boolean',
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
		bitmap: {
			control: {
				type: 'boolean',
			},
		},
		maxWeight: {
			control: {
				type: 'number',
			},
		},
		accept: {
			control: {
				type: 'object',
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
		const { accept, bitmap, ...mainArgs } = args;

		return {
			props: {
				accept,
				bitmap,
			},
			template: `<lu-file-upload ${generateInputs(mainArgs, argTypes)} [accept]="accept" [bitmap]="bitmap" />`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		small: false,
		state: null,
		multiple: false,
		accept: [
			{
				format: '.xls',
				name: 'XLS',
			},
			{
				format: '.xlsm',
			},
			{
				format: '.csv',
				name: 'CSV',
			},
		],
		maxWeight: 5,
		bitmap: false,
	},
};

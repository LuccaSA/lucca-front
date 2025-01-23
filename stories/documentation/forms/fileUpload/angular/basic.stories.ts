import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@lucca-front/ng/fileUpload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

interface FileUploadBasicStory {
	size: string;
	droppable: boolean;
	state: string;
	multiple: boolean;
}

export default {
	title: 'Documentation/FileUpload/Angular/Basic',
	argTypes: {
		size: {
			options: [null, 'S', 'XS'],
			control: {
				type: 'radio',
			},
		},
		state: {
			options: [null, 'loading', 'success', 'critical'],
			control: {
				type: 'radio',
			},
		},
		droppable: {
			control: {
				type: 'boolean',
			},
		},
		multiple: {
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
		return {
			template: `<lu-file-upload ${generateInputs(args, argTypes)} />`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		size: null,
		droppable: false,
		state: null,
		multiple: false,
	},
};

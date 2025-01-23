import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@lucca-front/ng/fileUpload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

interface FileUploadBasicStory {
	size: string;
	droppable: boolean;
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
		droppable: {
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
	},
};

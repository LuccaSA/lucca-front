import { provideHttpClient } from '@angular/common/http';
import { FileDropzoneComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

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
			styles: [`:host { display: block; min-height: 23rem }`],
		};
	},
} as Meta;

export const Basic = {
	args: {},
};

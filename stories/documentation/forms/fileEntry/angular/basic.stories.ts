import { provideHttpClient } from '@angular/common/http';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/File/FileEntry/Angular/Basic',
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
	},
	decorators: [
		moduleMetadata({
			imports: [FileEntryComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { fileName, fileSize, fileType, deletable, withPassword, ...otherArgs } = args;

		const deletableParam = deletable ? `(deleteFile)="deleteFile()"` : ``;
		const withPasswordParam = withPassword ? `(passwordChange)="passwordChange()"` : ``;

		return {
			template: `<lu-file-entry ${deletableParam} ${withPasswordParam} [entry]="{
			name: '${fileName}',
			size: ${fileSize},
			type: '${fileType}',
		}"  ${generateInputs(otherArgs, argTypes)} />`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		media: false,
		size: null,
		fileSize: 28420,
		fileType: 'image/png',
		fileName: 'dummyimage.png',
		previewUrl: 'https://dummyimage.com/500',
		state: null,
		inlineMessageError: 'Virus contenu dans le fichier sélectionné.',
		downloadable: false,
		deletable: true,
		format: 'file',
		withPassword: false,
	},
};

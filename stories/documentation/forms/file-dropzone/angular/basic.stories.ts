import { generateInputs } from '@/helpers/stories';
import { provideHttpClient } from '@angular/common/http';
import { FileDropzoneComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';

export default {
	title: 'Documentation/File/FileDropzone/Angular/Basic',
	argTypes: {
		accept: {
			control: {
				type: 'object',
			},
			description: 'Liste des formats de fichiers acceptés.',
			table: { category: 'inputs' },
		},
		fileMaxSize: {
			description: 'Limite le poids des fichiers importables (en octets).',
			control: {
				type: 'number',
			},
			table: { category: 'inputs', defaultValue: { summary: '80 Mo' } },
		},
		illustration: {
			options: ['invoice', 'picture'],
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration de l’icône dans la zone de drop. La valeur <code>paper</code> est dépréciée au profit de <code>invoice</code>.',
			table: { category: 'inputs', defaultValue: { summary: 'invoice' } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FileDropzoneComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { accept, ...otherArgs } = args;
		const acceptParam = accept?.length ? ` [accept]="accept"` : ``;
		return {
			props: { accept },
			template: `<lu-file-dropzone${acceptParam}${generateInputs(otherArgs, argTypes)} />`,
			styles: [`:host { display: block; min-block-size: 23rem }`],
		};
	},
} as Meta;

export const Basic = {
	args: {
		accept: [],
		illustration: 'invoice',
	},
};

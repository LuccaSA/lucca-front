import { provideHttpClient } from '@angular/common/http';
import { FILE_ENTRY_SIZE, FILE_ENTRY_STATE, FileEntryComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/File/FileEntry/Angular/Basic',
	argTypes: {
		size: {
			options: [null, ...FILE_ENTRY_SIZE],
			control: {
				type: 'radio',
			},
			description: 'Modifie la taille du composant.',
		},
		state: {
			options: [null, ...FILE_ENTRY_STATE],
			control: {
				type: 'radio',
			},
			description: 'Modifie l’état du composant.',
		},
		previewUrl: {
			if: { arg: 'iconOverride', truthy: false },
			description: 'URL de prévisualisation de l’image uploadée.',
		},
		displayFileName: {
			if: { arg: 'media', truthy: true },
			description: 'Affiche le nom du fichier sous l’image en vue <code>media</code>.',
		},
		media: {
			description: 'Affiche le fichier avec une mise en forme adaptée aux visuels.',
		},
		iconOverride: {
			description: 'Remplace l’icône de format de fichier.',
		},
		downloadURL: {
			description: 'URL de téléchargement du fichier.',
		},
		inlineMessageError: {
			description: 'Message d’erreur affiché sous le composant.',
		},
		deletable: {
			description: 'Affiche un bouton de suppression.',
		},
		withPassword: {
			description: 'Affiche un champ permettant de définir un mot de passe au fichier.',
		},
		fileName: {
			description: 'Nom du fichier.',
		},
		fileSize: {
			description: 'Poids du fichier (en octets).',
		},
		fileType: {
			description: 'Type MIME du fichier.',
		},
		withFileType: {
			control: 'boolean',
		},
		withFileSize: {
			control: 'boolean',
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
			type: ${fileType && `'${fileType}'`},
		}"  ${generateInputs(otherArgs, argTypes)} />`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		media: false,
		displayFileName: false,
		size: null,
		fileSize: 28420,
		withFileSize: true,
		fileType: 'image/png',
		withFileType: true,
		fileName: 'dummyimage.png',
		iconOverride: '',
		previewUrl: 'https://dummyimage.com/500',
		state: null,
		inlineMessageError: 'Virus détecté dans le fichier.',
		downloadURL: '',
		deletable: true,
		withPassword: false,
	},
};

import { provideHttpClient } from '@angular/common/http';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/File/FileEntry/Angular/Basic',
	argTypes: {
		size: {
			options: [null, 'L'],
			control: {
				type: 'radio',
			},
			description: 'Modifie la taille du composant.',
		},
		state: {
			options: [null, 'loading', 'error'],
			control: {
				type: 'radio',
			},
			description: "Modifie l'état du composant.",
		},
		previewUrl: {
			description: "URL de prévisualisation de l'image uploadée.",
		},
		displayFileName: {
			if: { arg: 'media', truthy: true },
			description: "Affiche le nom du fichier sous l'image en vue <code>media</code>.",
		},
		media: {
			description: 'Affiche le fichier avec une mise en forme adaptée aux visuels.',
		},
		iconOverride: {
			if: { arg: 'previewUrl', truthy: false },
			description: "Remplace l'icône de format de fichier.",
		},
		downloadURL: {
			description: 'URL de téléchargement du fichier.',
		},
		inlineMessageError: {
			description: "Message d'erreur affiché sous le composant.",
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
		structure: {
			if: { arg: 'size', truthy: true },
			description: "Augmente le border-radius du champ pour l'utiliser en élément de structure.",
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FileEntryComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { fileName, fileSize, fileType, deletable, withPassword, structure, ...otherArgs } = args;

		const deletableParam = deletable ? ` (deleteFile)="deleteFile()"` : ``;
		const withPasswordParam = withPassword ? ` (passwordChange)="passwordChange()"` : ``;
		const structureParam = structure ? ` structure` : ``;

		return {
			template: `<lu-file-entry${structureParam}${deletableParam}${withPasswordParam} [entry]="{
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
		displayFileName: false,
		size: null,
		fileSize: 28420,
		fileType: 'image/png',
		fileName: 'dummyimage.png',
		previewUrl: 'https://dummyimage.com/500',
		iconOverride: '',
		state: null,
		inlineMessageError: 'Virus détecté dans le fichier.',
		downloadURL: '',
		deletable: true,
		withPassword: false,
		structure: false,
	},
};

import { provideHttpClient } from '@angular/common/http';
import { FILE_ENTRY_SIZE, FILE_ENTRY_STATE, FileEntryComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/File/FileEntry/Angular/Basic',
	argTypes: {
		size: {
			options: setStoryOptions(FILE_ENTRY_SIZE),
			control: {
				type: 'radio',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		structure: {
			name: '↳ structure',
			if: { arg: 'size', truthy: true },
			description: 'Augmente le border-radius du champ pour l’utiliser en élément de structure.',
			table: { category: 'inputs' },
		},
		state: {
			options: setStoryOptions(FILE_ENTRY_STATE),
			control: {
				type: 'radio',
			},
			description: 'Modifie l’état du composant.',
			table: { category: 'inputs' },
		},
		media: {
			description: 'Affiche le fichier avec une mise en forme adaptée aux visuels.',
			table: { category: 'inputs' },
		},
		displayFileName: {
			name: '↳ displayFileName',
			if: { arg: 'media', truthy: true },
			description: 'Affiche le nom du fichier sous l’image en vue <code>media</code>.',
			table: { category: 'inputs' },
		},
		iconOverride: {
			description: 'Remplace l’icône de format de fichier.',
			table: { category: 'inputs' },
		},
		previewUrl: {
			name: '↳ previewUrl',
			if: { arg: 'iconOverride', truthy: false },
			description: 'URL de prévisualisation de l’image uploadée.',
			table: { category: 'inputs' },
		},
		downloadURL: {
			description: 'URL de téléchargement du fichier.',
			table: { category: 'inputs' },
		},
		openInNewTab: {
			name: '↳ openInNewTab',
			description: 'Ouvre le fichier dans un nouvel onglet au lieu de le télécharger. Peut varier selon les navigateurs ou les réglages utilisateurs.',
			if: { arg: 'downloadURL', truthy: true },
			table: { category: 'inputs' },
		},
		inlineMessageError: {
			description: 'Message d’erreur affiché sous le composant.',
			table: { category: 'inputs' },
		},
		deletable: {
			description: 'Affiche un bouton de suppression.',
			table: { category: 'inputs' },
		},
		withPassword: {
			description: 'Affiche un champ permettant de définir un mot de passe au fichier.',
			table: { category: 'inputs' },
		},
		fileName: {
			description: 'Nom du fichier.',
			table: { category: 'inputs' },
		},
		fileSize: {
			description: 'Poids du fichier (en octets).',
			table: { category: 'inputs' },
		},
		fileType: {
			description: 'Type MIME du fichier.',
			table: { category: 'inputs' },
		},
		withFileType: {
			control: 'boolean',
			table: { category: 'inputs' },
		},
		withFileSize: {
			control: 'boolean',
			table: { category: 'inputs' },
		},
		deleteFile: {
			description: 'Événement déclenché lors du clic sur le bouton de suppression du fichier.',
			action: 'deleteFile',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		passwordChange: {
			description: 'Événement déclenché lors de la modification du mot de passe du fichier.',
			action: 'passwordChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'string' } },
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
		const withPasswordParam = withPassword ? ` (passwordChange)="passwordChange($event)"` : ``;
		const structureParam = structure ? ` structure` : ``;

		return {
			props: {
				...args,
			},
			template: `<lu-file-entry${structureParam}${deletableParam}${withPasswordParam} [entry]="{
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
		fileSize: 28420,
		withFileSize: true,
		fileType: 'image/png',
		withFileType: true,
		fileName: 'dummyimage.png',
		previewUrl: 'https://dummyimage.com/500',
		iconOverride: '',
		state: null,
		inlineMessageError: 'Virus détecté dans le fichier.',
		downloadURL: '',
		openInNewTab: false,
		deletable: true,
		withPassword: false,
		structure: false,
	},
};

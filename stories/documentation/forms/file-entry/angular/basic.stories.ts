import { createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { provideHttpClient } from '@angular/common/http';
import { FILE_ENTRY_SIZE, FILE_ENTRY_STATE, FileEntryComponent } from '@lucca-front/ng/file-upload';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { waitForAngular } from '@/helpers/test';
import { expect, fn, userEvent, within } from 'storybook/test';

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
		state: {
			options: setStoryOptions(FILE_ENTRY_STATE),
			control: {
				type: 'radio',
			},
			description: 'Modifie l’état du composant.',
			table: { category: 'inputs' },
		},
		previewUrl: {
			if: { arg: 'iconOverride', truthy: false },
			description: 'URL de prévisualisation de l’image uploadée.',
			table: { category: 'inputs' },
		},
		displayFileName: {
			name: '↳ displayFileName',
			if: { arg: 'media', truthy: true },
			description: 'Affiche le nom du fichier sous l’image en vue <code>media</code>.',
			table: { category: 'inputs' },
		},
		media: {
			description: 'Affiche le fichier avec une mise en forme adaptée aux visuels.',
			table: { category: 'inputs' },
		},
		iconOverride: {
			description: 'Remplace l’icône de format de fichier.',
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
		structure: {
			name: '↳ structure',
			if: { arg: 'size', truthy: true },
			description: 'Augmente le border-radius du champ pour l’utiliser en élément de structure.',
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
		fileType: 'image/png',
		fileName: 'dummyimage.png',
		previewUrl: 'https://dummyimage.com/500',
		iconOverride: '',
		state: null,
		inlineMessageError: 'Virus détecté dans le fichier.',
		downloadURL: '',
		openInNewTab: false,
		deletable: true,
		withPassword: false,
		size: '',
		structure: false,
	},
};

export const BasicTEST = createTestStory({ ...Basic, args: { ...Basic.args, deleteFile: fn() } }, async ({ canvasElement, step, args }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	// The file name is surrounded by non-breaking spaces
	const getDeleteButton = () => canvas.getByRole('button', { name: /Supprimer le fichier\s«\sdummyimage\.png\s»/ });

	await step('The entry displays the name, format and size of the file', async () => {
		await expect(canvas.getByText('dummyimage.png')).toBeInTheDocument();
		await expect(canvas.getByText('Fichier PNG')).toBeInTheDocument();
		await expect(canvas.getByText('28ko')).toBeInTheDocument();
	});

	await step('The entry displays the preview of the file', async () => {
		await expect(canvasElement.querySelector('.fileEntry-status-content-inside-img')).toHaveAttribute('src', 'https://dummyimage.com/500');
	});

	await step('Clicking the delete button emits deleteFile', async () => {
		await userEvent.click(getDeleteButton());
		await waitForAngular();
		await expect(args.deleteFile).toHaveBeenCalledTimes(1);
	});

	await step('The delete button can be triggered with the keyboard', async () => {
		getDeleteButton().focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(args.deleteFile).toHaveBeenCalledTimes(2);
	});

	await step('Without a download URL, there is no download link', async () => {
		await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
	});
});

export const ErrorTEST = createTestStory({ ...Basic, name: 'Error', args: { ...Basic.args, state: 'error' } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('The error message replaces the file description', async () => {
		await expect(canvas.getByText('Virus détecté dans le fichier.')).toBeInTheDocument();
		await expect(canvas.queryByText('Fichier PNG')).not.toBeInTheDocument();
	});

	await step('The preview is not displayed in error state', async () => {
		await expect(canvasElement.querySelector('.fileEntry-status-content-inside-img')).not.toBeInTheDocument();
	});

	await step('The delete button is displayed as critical', async () => {
		await expect(canvas.getByRole('button', { name: /Supprimer le fichier\s«\sdummyimage\.png\s»/ })).toHaveClass('palette-critical');
	});
});

export const DownloadTEST = createTestStory({ ...Basic, name: 'Download', args: { ...Basic.args, deletable: false, downloadURL: 'https://dummyimage.com/500' } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('Without deleteFile listener, there is no delete button', async () => {
		await expect(canvas.queryByRole('button', { name: /Supprimer le fichier/ })).not.toBeInTheDocument();
	});

	await step('The download link downloads the file', async () => {
		const link = canvas.getByRole('link', { name: /Télécharger le fichier\s«\sdummyimage\.png\s»/ });
		await expect(link).toHaveAttribute('href', 'https://dummyimage.com/500');
		await expect(link).toHaveAttribute('download', 'download');
		await expect(link).not.toHaveAttribute('target');
	});
});

export const OpenInNewTabTEST = createTestStory(
	{ ...Basic, name: 'Open in new tab', args: { ...Basic.args, deletable: false, downloadURL: 'https://dummyimage.com/500', openInNewTab: true } },
	async ({ canvasElement, step }) => {
		await waitForAngular();

		const canvas = within(canvasElement);

		await step('The link opens the file in a new tab instead of downloading it', async () => {
			const link = canvas.getByRole('link', { name: /dummyimage\.png/ });
			await expect(link).toHaveAttribute('href', 'https://dummyimage.com/500');
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
			await expect(link).not.toHaveAttribute('download');
		});
	},
);

export const PasswordTEST = createTestStory({ ...Basic, name: 'Password', args: { ...Basic.args, withPassword: true, passwordChange: fn() } }, async ({ canvasElement, step, args }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('Typing a password emits passwordChange', async () => {
		const field = canvas.getByLabelText(/Mot de passe/);
		await expect(field).toHaveAttribute('type', 'password');
		await userEvent.type(field, 'secret');
		await waitForAngular();
		await expect(args.passwordChange).toHaveBeenLastCalledWith('secret');
	});

	await step('The password can be confirmed', async () => {
		await expect(canvas.getByRole('button', { name: 'Valider le mot de passe' })).toBeInTheDocument();
	});
});

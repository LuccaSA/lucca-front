import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, fn, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/file-entry/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/FileEntry',
	tags: ['!autodocs'],
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

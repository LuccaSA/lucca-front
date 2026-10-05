import { Meta } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, waitForAngular } from '@/helpers/test';
import { screen, userEvent, within } from 'storybook/test';
import meta, { WithTagPluginWithNoInitialValue } from '@/stories/forms/fields/rich-text/angular/rich-text-input.stories';

export default {
	...meta,
	title: 'E2E/RichTextInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(WithTagPluginWithNoInitialValue, async (context) => {
	const canvas = within(context.canvasElement);
	const editor = canvas.getByRole('textbox');

	await context.step('Type and apply text styles', async () => {
		await userEvent.click(editor);
		await userEvent.type(editor, 'Bonjour ');

		await clickToolbarButton('Gras');
		await userEvent.type(editor, 'gras');
		await clickToolbarButton('Gras');

		await userEvent.type(editor, ' et ');
		await clickToolbarButton('Italique');
		await userEvent.type(editor, 'italique');
		await clickToolbarButton('Italique');
		await waitForAngular();

		await userEvent.type(editor, ' et ');
		await clickToolbarButton('Barré');
		await userEvent.type(editor, 'barré');
		await clickToolbarButton('Barré');
		await waitForAngular();

		await expectNgModelDisplay(context.canvasElement, '<p><span>Bonjour </span><b><strong>gras</strong></b><span> et </span><i><em>italique</em></i><span> et </span><s><span>barré</span></s></p>');
	});

	await context.step('Create a bulleted list', async () => {
		await userEvent.type(editor, '{Enter}');
		await clickToolbarButton('Liste à puces');
		await userEvent.type(editor, 'Premier point{Enter}Second point');
		await clickToolbarButton('Liste à puces');
		await waitForAngular();

		await expectNgModelDisplay(context.canvasElement, 'Premier point');
		await expectNgModelDisplay(context.canvasElement, 'Second point');
	});

	await context.step('Create a numbered list', async () => {
		await clickToolbarButton('Liste numérotée');
		await userEvent.type(editor, 'Troisieme point{Enter}Quatrieme point');
		await clickToolbarButton('Liste numérotée');
		await waitForAngular();

		await expectNgModelDisplay(context.canvasElement, 'Troisieme point');
		await expectNgModelDisplay(context.canvasElement, 'Quatrieme point');
	});

	await context.step('Create a link', async () => {
		await userEvent.type(editor, '{Enter}links');
		await userEvent.keyboard('{Shift>}{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}{/Shift}');
		await clickToolbarButton('Lien');

		const linkInput = screen.getByPlaceholderText('https://www.nomDuSite.com');
		await userEvent.clear(linkInput);
		await userEvent.type(linkInput, 'https://example.org/docs');
		await userEvent.click(screen.getByRole('button', { name: 'Valider' }));
		await waitForAngular();

		await expectNgModelDisplay(context.canvasElement, '<p><a href="https://example.org/docs" rel="noreferrer"><span>links</span></a></p>');
	});

	await context.step('add tag', async () => {
		await userEvent.keyboard('{Meta>}a{/Meta}{Backspace}');

		await userEvent.click(canvas.getByText('Tag 1'));
		await userEvent.click(canvas.getByText('Tag 2'));
		await userEvent.click(canvas.getByText('Tag 3'));
		await waitForAngular();

		await expectNgModelDisplay(context.canvasElement, '{{tag1}}{{tag2}}{{tag3}}');
	});
});

async function clickToolbarButton(name: string) {
	const toolbar = screen.getByRole('toolbar');
	await userEvent.click(within(toolbar).getByRole('button', { name }));
}

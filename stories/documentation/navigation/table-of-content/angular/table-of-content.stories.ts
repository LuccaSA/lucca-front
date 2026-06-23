import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

interface TableOfContentBasicStory {
	disabled: boolean;
}

export default {
	title: 'Documentation/Navigation/TableOfContent/Angular/Basic',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le lien d’un des éléments.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [TableOfContentComponent, TableOfContentLinkDirective],
		}),
	],
	render: (args: TableOfContentBasicStory) => {
		const disabled = args.disabled ? ` disabled` : '';
		return {
			template: cleanupTemplate(`<lu-table-of-content>
	<a *luTableOfContentLink class="is-active" href="#">Section 1</a>
	<a *luTableOfContentLink href="#"${disabled}>Section 2</a>
	<a *luTableOfContentLink href="#"${disabled}>Section 3</a>
	<a *luTableOfContentLink href="#"${disabled}>Section 4</a>
</lu-table-of-content>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		disabled: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const nav = canvas.getByRole('navigation');
		await expect(nav).toBeVisible();
	});

	await step('Vérifie les liens de la table des matières', async () => {
		const links = canvas.getAllByRole('link');
		await expect(links.length).toBe(4);
	});

	await step('Clic sur un lien', async () => {
		const links = canvas.getAllByRole('link');
		await userEvent.click(links[1]);
		await waitForAngular();
	});

	await step('Navigation clavier entre les liens', async () => {
		const links = canvas.getAllByRole('link');
		links[0].focus();
		await expect(links[0]).toHaveFocus();
		await userEvent.tab();
		await waitForAngular();
		await expect(links[1]).toHaveFocus();
	});
});

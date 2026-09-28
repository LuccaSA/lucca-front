import { PAGINATION_MOD, PaginationComponent } from '@lucca-front/ng/pagination';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Navigation/Pagination/Angular',
	decorators: [
		moduleMetadata({
			imports: [PaginationComponent],
		}),
	],
	argTypes: {
		isFirstPage: {
			type: 'boolean',
			description: 'Désactive le bouton précédent.',
		},
		isLastPage: {
			type: 'boolean',
			description: 'Désactive le bouton suivant.',
		},
		from: {
			type: 'number',
			description: 'Numéro du dernier élément affiché.',
		},
		to: {
			type: 'number',
			description: 'Numéro du dernier élément affiché.',
		},
		itemsCount: {
			type: 'number',
			description: 'Nombre total d’éléments.',
		},
		mod: {
			options: setStoryOptions(PAGINATION_MOD),
			control: {
				type: 'select',
			},
			description: 'Affiche la pagination en vue compacte (seulement avec les boutons précédent et suivant).',
		},
	},
} as Meta;

export const Basic: StoryObj<PaginationComponent & { isFirstPage: boolean; isLastPage: boolean; from: number; to: number; itemsCount: number; mod: string }> = {
	render: (args, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-pagination ${generateInputs(args, argTypes)} />`),
		};
	},
	args: {
		from: 1,
		to: 20,
		itemsCount: 27,
		isFirstPage: true,
		isLastPage: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const nav = canvas.getByRole('navigation');
		await expect(nav).toBeVisible();
	});

	await step('Vérifie les boutons de navigation', async () => {
		const buttons = canvas.getAllByRole('button');
		await expect(buttons.length).toBeGreaterThan(0);
	});

	await step('Clique sur le bouton page suivante', async () => {
		const buttons = canvas.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		await expect(nextButton).not.toBeDisabled();
		await userEvent.click(nextButton);
		await waitForAngular();
	});

	await step('Navigation clavier sur la pagination', async () => {
		const buttons = canvas.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		nextButton.focus();
		await expect(nextButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
	});
});

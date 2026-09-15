import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	CALLOUT_POPOVER_SIZE,
	CalloutFeedbackItemComponent,
	CalloutFeedbackItemDescriptionDirective,
	CalloutFeedbackListComponent,
	CalloutPopoverComponent,
	CalloutStates,
} from '@lucca-front/ng/callout';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { sleep, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Feedback/Callout Popover/Angular',
	component: CalloutPopoverComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, ButtonComponent, BrowserAnimationsModule],
		}),
	],
	render: ({ items, customText, ...args }, { argTypes }) => {
		const itemsContent = `
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>Feedback description</lu-feedback-item-description>
				<button lu-feedback-item-action luButton>Click me!</button>
				<button lu-feedback-item-action luButton="outlined">Click me!</button>
			</li>`.repeat(items);
		if (customText !== '') {
			return {
				template: `<lu-callout-popover${generateInputs(args, argTypes)}>
		${customText}
	</lu-callout-popover>`,
			};
		} else {
			return {
				template: `<lu-callout-popover${generateInputs(args, argTypes)}>
		<ul lu-callout-feedback-list palette="neutral">${itemsContent}
		</ul>
	</lu-callout-popover>`,
			};
		}
	},
	argTypes: {
		items: {
			control: {
				type: 'number',
				min: 1,
			},
			if: { arg: 'customText', truthy: false },
			description: 'Nombre d’éléments présentés dans la story.',
			table: { category: 'inputs' },
		},
		buttonLabel: {
			description: 'Label du bouton.',
			table: { category: 'inputs' },
		},
		buttonAlt: {
			description: 'Information restituée par le bouton.',
			table: { category: 'inputs' },
		},
		popoverPosition: {
			options: ['', 'below', 'before', 'after'],
			control: {
				type: 'select',
			},
			description: 'Position du popover par rapport au bouton de déclenchement.',
			table: { category: 'inputs' },
		},
		icon: {
			options: ['', 'info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au callout.',
			table: { category: 'inputs' },
		},
		state: {
			options: setStoryOptions(CalloutStates),
			control: {
				type: 'select',
			},
			description: 'État du callout.',
			table: { category: 'inputs' },
		},
		heading: {
			description: 'Ajoute un titre au popover. [PortalContent]',
			if: { arg: 'customText', truthy: false },
			table: { category: 'inputs' },
		},
		headingHiddenIfSingleItem: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'customText', truthy: false },
			description: 'Masque le titre si le popover ne contient qu’un élément.',
			table: { category: 'inputs' },
		},
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au callout.',
			table: { category: 'inputs' },
		},
		popoverTrigger: {
			options: ['click', 'click+hover', 'hover+focus'],
			control: {
				type: 'select',
			},
			description: 'Détermine le mode d’ouverture du popover.',
			table: { category: 'inputs' },
		},
		popoverDisabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive l’apparition du popover.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(CALLOUT_POPOVER_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		closeDelay: {
			description: 'Délai nécessaire à la fermeture du popover.',
			table: { category: 'inputs' },
		},
		openDelay: {
			description: 'Délai nécessaire à l’ouverture du popover.',
			table: { category: 'inputs' },
		},
		customText: {
			description: 'Remplace la liste d’éléments par un texte personnalisé.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Template: StoryObj<CalloutPopoverComponent & { items: number; customText: string; popoverTrigger: 'click' | 'click+hover' | 'hover+focus' }> = {
	args: {
		icon: 'signInfo',
		palette: 'none',
		buttonLabel: '2',
		buttonAlt: '2 errors',
		customText: '',
		heading: '',
		popoverTrigger: null,
		popoverDisabled: false,
		headingHiddenIfSingleItem: false,
		items: 2,
		closeDelay: 500,
		openDelay: 50,
	},
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Interaction souris - ouverture du popover', async () => {
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await sleep(500);
		const popoverContent = screen.getByRole('list');
		await expect(popoverContent).toBeVisible();
	});

	await step('Interaction souris - fermeture du popover', async () => {
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await sleep(500);
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	await step('Interaction clavier - ouverture avec Entrée', async () => {
		const button = canvas.getByRole('button');
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await sleep(500);
		const popoverContent = screen.getByRole('list');
		await expect(popoverContent).toBeVisible();
	});

	await step('Interaction clavier - fermeture avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await sleep(500);
		await expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});
});

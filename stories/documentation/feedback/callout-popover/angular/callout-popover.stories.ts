import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutPopoverComponent } from '@lucca-front/ng/callout';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

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
			description: "Nombre d'éléments présentés dans la story.",
		},
		buttonLabel: {
			description: 'Label du bouton.',
		},
		buttonAlt: {
			description: 'Information restituée par le bouton.',
		},
		popoverPosition: {
			options: [null, 'below', 'before', 'after'],
			control: {
				type: 'select',
			},
			description: 'Position du popover par rapport au bouton de déclenchement.',
		},
		icon: {
			options: [null, 'info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au callout.',
		},
		state: {
			options: [null, 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: 'État du callout.',
		},
		heading: {
			description: 'Ajoute un titre au popover.',
			if: { arg: 'customText', truthy: false },
		},
		headingHiddenIfSingleItem: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'customText', truthy: false },
			description: "Masque le titre si le popover ne contient qu'un élément.",
		},
		palette: {
			options: ['none', 'product', 'neutral'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au callout.',
		},
		popoverTrigger: {
			options: ['click', 'click+hover', 'hover+focus'],
			control: {
				type: 'select',
			},
			description: "Détermine le mode d'ouverture du popover.",
		},
		size: {
			options: [null, 'XS', 'S', 'M'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		closeDelay: {
			description: 'Délai nécessaire à la fermeture du popover.',
		},
		openDelay: {
			description: "Délai nécessaire à l'ouverture du popover.",
		},
		customText: {
			description: 'Remplace la liste d’éléments par un texte personnalisé.',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutPopoverComponent & { items: number; customText: string; popoverTrigger: 'click' | 'click+hover' | 'hover+focus' }> = {
	args: {
		icon: 'signInfo',
		palette: 'none',
		state: null,
		size: null,
		buttonLabel: '2',
		buttonAlt: '2 errors',
		customText: '',
		heading: '',
		popoverTrigger: null,
		headingHiddenIfSingleItem: false,
		items: 2,
		closeDelay: 500,
		openDelay: 50,
		popoverPosition: null,
	},
};

import { generateInputs, setStoryOptions } from '@/helpers/stories';

import { ButtonComponent } from '@lucca-front/ng/button';
import { CALLOUT_SIZE, CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutStates } from '@lucca-front/ng/callout';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/Angular/Basic',
	component: CalloutDisclosureComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutFeedbackItemDescriptionDirective, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const { palette, ...inputs } = args;
		const paletteArg = palette !== 'none' && palette !== undefined ? ` palette="${palette}"` : ``;

		return {
			props: {
				...args,
			},
			template: `<lu-callout-disclosure${paletteArg}${generateInputs(inputs, argTypes)} (openChange)="openChange($event)">
		<ul lu-callout-feedback-list palette="neutral">
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>
					 Feedback description.
				</lu-feedback-item-description>
				<button lu-feedback-item-action luButton="outlined">Click me !</button>
				<button lu-feedback-item-action luButton="ghost">Click me but inverted !</button>
			</li>
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>
					 Feedback description #2.
				</lu-feedback-item-description>
				<button lu-feedback-item-action luButton>Click me !</button>
			</li>
		</ul>
	</lu-callout-disclosure>`,
		};
	},
	argTypes: {
		icon: {
			options: ['', 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp'],
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
		size: {
			options: setStoryOptions(CALLOUT_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du callout.',
			table: { category: 'inputs' },
		},
		heading: {
			description: 'Titre du callout. [PortalContent]',
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
		open: {
			description: 'Place le callout dans son état déplié.',
			table: { category: 'inputs' },
		},
		feedbackListPalette: {
			name: 'palette',
			control: false,
			description: 'Palette de la liste <code>ul[lu-callout-feedback-list]</code>. Par défaut, hérite de la palette du parent.',
			table: { category: 'inputs (callout-feedback-list)', type: { summary: 'Palette' } },
		},
		feedbackListSize: {
			name: 'size',
			control: false,
			description: 'Taille de la liste <code>ul[lu-callout-feedback-list]</code>. M par défaut.',
			table: { category: 'inputs (callout-feedback-list)', type: { summary: 'CalloutSize' } },
		},
		openChange: {
			description: "Événement déclenché lors du changement d'état déplié/replié du callout.",
			action: 'openChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'boolean' } },
		},
	},
} as Meta;

export const Template: StoryObj<CalloutDisclosureComponent> = {
	name: 'Basic',
	args: {
		heading: 'List title',
		palette: 'none',
		open: false,
	},
};

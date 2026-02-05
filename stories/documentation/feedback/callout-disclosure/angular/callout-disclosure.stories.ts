import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/Angular',
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
			template: `<lu-callout-disclosure ${paletteArg}${generateInputs(args, argTypes)}>
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
			options: [null, 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp'],
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
		size: {
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du callout.',
		},
		heading: {
			description: 'Titre du callout.',
		},
		palette: {
			options: ['none', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au callout.',
		},
		open: {
			description: 'Place le callout dans son état déplié.',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutDisclosureComponent> = {
	args: {
		state: null,
		heading: 'List title',
		icon: null,
		palette: 'none',
		open: false,
	},
};

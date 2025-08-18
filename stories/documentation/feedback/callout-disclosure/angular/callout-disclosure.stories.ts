import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/Angular',
	component: CalloutDisclosureComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<lu-callout-disclosure ${generateInputs(args, argTypes)}>
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
			options: [null, 'info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
		},
		state: {
			options: [null, 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		open: {
			description: '[v17.2]',
		},
		size: {
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<CalloutDisclosureComponent> = {
	args: {
		state: null,
		heading: 'List title',
		icon: 'signInfo',
		palette: 'none',
		open: false,
	},
};

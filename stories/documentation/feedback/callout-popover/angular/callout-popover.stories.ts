import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutPopoverComponent } from '@lucca-front/ng/callout';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout Popover/Angular',
	component: CalloutPopoverComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, ButtonComponent, BrowserAnimationsModule],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<lu-callout-popover ${generateInputs(args, argTypes)}>
		<ul lu-callout-feedback-list palette="neutral">
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>
					 Feedback description.
				</lu-feedback-item-description>
				<button lu-feedback-item-action luButton="outlined">Click me !</button>
				<button lu-feedback-item-action luButton="text">Click me but inverted !</button>
			</li>
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>
					 Feedback description #2.
				</lu-feedback-item-description>
				<button lu-feedback-item-action luButton>Click me !</button>
			</li>
		</ul>
	</lu-callout-popover>`,
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
		buttonLabel : {
			control: {
				type: 'number',
			}
		}
	},
} as Meta;

export const Template: StoryObj<CalloutPopoverComponent> = {
	args: {
		size: 'M',
		state: null,
		buttonLabel: '1',
		heading: 'List title',
		icon: 'signInfo',
		palette: 'none',
		closeDelay: 500,
		openDelay: 50,
	},
};

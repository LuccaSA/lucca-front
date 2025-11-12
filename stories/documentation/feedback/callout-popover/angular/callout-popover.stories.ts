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
	render: ({ items, ...args }, { argTypes }) => {
		const itemsContent = `
			<li lu-callout-feedback-item>
				<lu-feedback-item-description>Feedback description</lu-feedback-item-description>
				<button lu-feedback-item-action luButton>Click me!</button>
				<button lu-feedback-item-action luButton="outlined">Click me!</button>
			</li>`.repeat(items);
		return {
			template: `<lu-callout-popover${generateInputs(args, argTypes)}>
		<ul lu-callout-feedback-list palette="neutral">${itemsContent}
		</ul>
	</lu-callout-popover>`,
		};
	},
	argTypes: {
		items: {
			control: {
				type: 'number',
				min: 1,
			},
		},
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
		headingHiddenIfSingleItem: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

export const Template: StoryObj<CalloutPopoverComponent & { items: number }> = {
	args: {
		items: 2,
		buttonLabel: '2',
		buttonAlt: '2 errors',
		state: null,
		heading: '',
		headingHiddenIfSingleItem: false,
		icon: 'signInfo',
		palette: 'none',
		closeDelay: 500,
		openDelay: 50,
	},
};

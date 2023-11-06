import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutPopoverComponent } from '@lucca-front/ng/callout';
import { ButtonComponent } from '@lucca-front/ng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Documentation/Feedback/Callout Popover/Angular',
	component: CalloutPopoverComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, ButtonComponent, BrowserAnimationsModule],
		}),
	],
	render: (args: CalloutPopoverComponent & { iconless: boolean }) => {
		const { heading, icon, iconless, palette, size, buttonLabel } = args;
		const iconStr = iconless ? '[icon]="null"' : `icon="${icon}"`;
		// TODO build something to generate these instead of always applying the same logic
		const paletteStr = palette ? ` palette="${palette}"` : '';
		const sizeStr = size ? ` size="${size}"` : '';
		return {
			template: `<lu-callout-popover heading="${heading}" buttonLabel="${buttonLabel}"${paletteStr}${sizeStr} ${iconStr}>
		<ul lu-callout-feedback-list palette="grey">
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
		iconless: {
			control: 'boolean',
			description: 'This is not a real input, it just sets icon to null because storybook cannot do it',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutPopoverComponent & { iconless: boolean }> = {
	args: {
		buttonLabel: '1',
		heading: 'More details',
		icon: 'signInfo',
	},
};

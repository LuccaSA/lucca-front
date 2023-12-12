import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/Angular',
	component: CalloutDisclosureComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent],
		}),
	],
	render: (args: CalloutDisclosureComponent & { iconless: boolean }) => {
		const { heading, icon, iconless, palette, size, open } = args;
		const openStr = `[open]="${open}"`;
		const iconStr = iconless ? '[icon]="null"' : `icon="${icon}"`;
		// TODO build something to generate these instead of always applying the same logic
		const paletteStr = palette ? ` palette="${palette}"` : '';
		const sizeStr = size ? ` size="${size}"` : '';
		return {
			template: `<lu-callout-disclosure heading="${heading}"${paletteStr}${sizeStr} ${iconStr} ${openStr}>
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
	</lu-callout-disclosure>`,
		};
	},
	argTypes: {
		iconless: {
			control: 'boolean',
			description: 'This is not a real input, it just sets icon to null because storybook cannot do it',
		},
	},
} as Meta;

export const Template: StoryObj<CalloutDisclosureComponent & { iconless: boolean }> = {
	args: {
		icon: 'signInfo',
		heading: 'List title',
		iconless: false,
	},
};

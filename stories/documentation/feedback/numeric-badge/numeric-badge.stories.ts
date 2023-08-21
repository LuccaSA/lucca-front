import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';

export default {
	title: 'Documentation/Feedback/NumericBadge/Basic',
	component: NumericBadgeComponent,
	decorators: [
		moduleMetadata({
			entryComponents: [NumericBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: ['none', 'primary', 'grey', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<NumericBadgeComponent> = {
	args: {
		value: 7,
		size: 'M',
		palette: 'none',
	},
};

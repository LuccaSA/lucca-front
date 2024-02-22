import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/NumericBadge/Angular/Basic',
	component: NumericBadgeComponent,
	decorators: [
		moduleMetadata({
			entryComponents: [NumericBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: ['none', 'product', 'neutral', 'success', 'warning', 'error'],
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

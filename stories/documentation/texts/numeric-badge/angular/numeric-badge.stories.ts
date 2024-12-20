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
		value: {
			description: 'Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "+2", etc.)',
		},
		size: {
			control: {
				type: 'select',
			},
		},
		loading: {
			control: {
				type: 'boolean',
			},
			description: '[v19.1]',
		},
	},
} as Meta;

export const Template: StoryObj<NumericBadgeComponent> = {
	args: {
		value: 7,
		loading: false,
	},
};

import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

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
			description: 'Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.)',
		},
		maxValue: {
			type: 'number',
			description: '[v19.2]',
		},
		disableTooltip: {
			type: 'boolean',
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
	render: (args, { argTypes }) => {
		const { value, ...inputs } = args;
		return {
			template: `<lu-numeric-badge ${generateInputs(inputs, argTypes)} [value]="${value}" />`,
		};
	},
} as Meta;

export const Template: StoryObj<NumericBadgeComponent> = {
	args: {
		value: 7,
		maxValue: 999,
		loading: false,
		disableTooltip: false,
	},
};

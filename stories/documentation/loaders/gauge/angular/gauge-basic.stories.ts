import { GaugeComponent } from '@lucca-front/ng/gauge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Loaders/Gauge/Angular/Basic',
	argTypes: {
		palette: {
			options: ['', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
		},
		size: {
			control: { type: 'range', min: 32, max: 160, step: 16 },
			if: { arg: 'circular', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [GaugeComponent],
		}),
	],
	render: (args: GaugeComponent, { argTypes }) => {
		const { alt, value, palette, ...inputs } = args;
		const alternative = alt ? ` alt="${alt}"` : ``;
		const val = value ? ` value="${value}"` : ``;
		const pal = palette ? ` palette="${palette}"` : ``;

		return {
			template: `<lu-gauge${generateInputs(inputs, argTypes)}${alternative}${val}${pal} />`,
		};
	},
} as Meta;

export const Basic: StoryObj<GaugeComponent> = {
	args: {
		thin: false,
		animated: false,
		circular: false,
		value: 33,
		alt: '',
		size: 80,
	},
};

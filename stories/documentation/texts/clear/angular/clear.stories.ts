import { ClearComponent } from '@lucca-front/ng/clear';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/Clear/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [ClearComponent],
		}),
	],

	render: (args, { argTypes }) => {
		const { size, alt, hidden, palette, ...inputArgs } = args;
		const sizeAttr = size === 'S' ? ` size="S"` : ``;
		const hiddenAttr = hidden ? ` hidden` : ``;
		const paletteAttr = palette ? ` palette="${palette}"` : ``;
		return {
			template: `<lu-clear${hiddenAttr}${sizeAttr}${paletteAttr}${generateInputs(inputArgs, argTypes)}>${alt}</lu-clear>`,
		};
	},
} as Meta;

export const Template: StoryObj = {
	argTypes: {
		palette: {
			options: ['', 'success', 'warning', 'error', 'product', 'brand', 'neutral', 'none', 'primary', 'grey'],
			control: {
				type: 'select',
			},
		},
		inverted: {
			if: { arg: 'disabled', truthy: false },
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
		},
	},
	args: {
		disabled: false,
		palette: '',
		inverted: false,
		size: '',
		alt: 'Clear',
		hidden: false,
	},
};

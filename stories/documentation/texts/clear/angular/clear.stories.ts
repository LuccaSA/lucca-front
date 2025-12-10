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
		const { size, alt, hidden, ...inputArgs } = args;
		const sizeAttr = size === 'S' ? ` size="S"` : ``;
		const hiddenAttr = hidden ? ` hidden` : ``;
		return {
			template: `<lu-clear${hiddenAttr}${sizeAttr}${generateInputs(inputArgs, argTypes)}>${alt}</lu-clear>`,
		};
	},
} as Meta;

export const Template: StoryObj = {
	argTypes: {
		product: {
			if: { arg: 'disabled', truthy: false },
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
		product: false,
		inverted: false,
		size: '',
		alt: 'Clear',
		hidden: false,
	},
};

import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Basic',
	argTypes: {
		icon: {
			options: ['compensation'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['XXS', 'XS', 'S', '', 'L'],
			control: {
				type: 'select',
			},
		},
		palette: {
			options: ['', 'neutral'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconComponent],
		}),
	],
	render: ({ palette, size, ...args }, { argTypes }) => {
		const paletteArg = palette !== '' ? ` palette="${palette}"` : ``;
		const sizeArg = size !== '' ? ` size="${size}"` : ``;
		return {
			template: cleanupTemplate(`<lu-software-icon${sizeArg}${paletteArg}${generateInputs(args, argTypes)} />`),
		};
	},
} as Meta;

export const Basic: StoryObj<SoftwareIconComponent & { palette: string }> = {
	args: {
		icon: 'compensation',
		palette: '',
		size: '',
	},
};

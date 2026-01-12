import { BubbleMoodComponent } from '@lucca-front/ng/bubble-mood';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Bubble mood/Angular/Basic',
	argTypes: {
		mood: {
			options: ['angry', 'bored', 'happy', 'joyful', 'moody', 'sad', 'shoked', 'sly', 'smirking', 'surprised'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['XS', 'S', '', 'L'],
			control: {
				type: 'select',
			},
		},
		palette: {
			options: [
				// products
				'product',
				'pagga',
				'poplee',
				'coreHR',
				'timmi',
				'cleemy',
				'cc',
				'brand',
				// states
				'neutral',
				'success',
				'warning',
				'critical',
				// decoratives
				'kiwi',
				'lime',
				'cucumber',
				'mint',
				'glacier',
				'lagoon',
				'blueberry',
				'lavender',
				'grape',
				'watermelon',
				'pumpkin',
				'pineapple',
			],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BubbleMoodComponent],
		}),
	],
	render: ({ size, palette, ...args }, { argTypes }) => {
		const sizeArg = size !== '' ? ` size="${size}"` : ``;
		const paletteArg = palette !== 'product' ? ` palette="${palette}"` : ``;
		return {
			template: `<lu-bubble-mood${paletteArg}${sizeArg}${generateInputs(args, argTypes)} />`,
		};
	},
} as Meta;

export const Basic: StoryObj<BubbleMoodComponent> = {
	args: {
		mood: 'joyful',
		palette: 'product',
		size: '',
	},
};

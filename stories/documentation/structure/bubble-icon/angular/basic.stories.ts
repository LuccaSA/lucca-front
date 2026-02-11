//import { DecorativeIconComponent } from '@lucca-front/ng/';
import { IconsList } from '@/stories/icons-list';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Bubble icon/Angular/Basic',
	argTypes: {
		direction: {
			options: ['', 'left', 'right', 'top', 'bottom'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['S', '', 'L'],
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
		icon: {
			options: IconsList.filter((i) => !i.deprecated).map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BubbleIconComponent],
		}),
	],
	render: ({ direction, alt, palette, size, ...args }, { argTypes }) => {
		const sizeArg = size !== '' ? ` size="${size}"` : ``;
		const directionArg = direction === null || direction === '' ? `` : ` bubbleDirection="${direction}"`;
		const altArg = alt === '' ? `` : ` alt="${alt}"`;
		const paletteArg = palette === 'product' ? `` : ` palette="${palette}"`;
		return {
			styles: [`:host { display: flex; gap: var(--pr-t-spacings-50) }`],
			template: `<lu-bubble-icon${sizeArg}${altArg}${paletteArg}${directionArg}${generateInputs(args, argTypes)} />\n`.repeat(4),
		};
	},
} as Meta;

export const Basic: StoryObj<BubbleIconComponent & { palette: string }> = {
	args: {
		icon: 'app',
		direction: null,
		palette: 'product',
		size: '',
		alt: '',
	},
};

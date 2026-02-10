//import { DecorativeIconComponent } from '@lucca-front/ng/';
import { IconsList } from '@/stories/icons-list';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { RoundedIconComponent } from '@lucca-front/ng/rounded-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Rounded icon/Angular/Basic',
	argTypes: {
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
			imports: [RoundedIconComponent],
		}),
	],
	render: ({ direction, alt, palette, size, ...args }, { argTypes }) => {
		const sizeArg = size !== '' ? ` size="${size}"` : ``;
		const altArg = alt === '' ? `` : ` alt="${alt}"`;
		const paletteArg = palette === 'product' ? `` : ` palette="${palette}"`;
		return {
			styles: [`:host { display: flex; gap: var(--pr-t-spacings-50) }`],
			template: `<lu-rounded-icon${sizeArg}${altArg}${paletteArg}${generateInputs(args, argTypes)} />`,
		};
	},
} as Meta;

export const Basic: StoryObj<BubbleIconComponent & { palette: string }> = {
	args: {
		icon: 'app',
		palette: 'product',
		size: '',
		alt: '',
	},
};

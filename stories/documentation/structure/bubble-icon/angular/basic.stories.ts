//import { DecorativeIconComponent } from '@lucca-front/ng/';
import { IconsList } from '@/stories/icons-list';
import { BUBBLE_ICON_DIRECTION, BUBBLE_ICON_SIZE, BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Bubble icon/Angular/Basic',
	argTypes: {
		direction: {
			options: setStoryOptions(BUBBLE_ICON_DIRECTION),
			control: {
				type: 'select',
			},
			description: 'Définit une direction de la bulle. Aléatoire par défaut.',
		},
		size: {
			options: setStoryOptions(BUBBLE_ICON_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
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
			description: 'Applique une palette de couleurs au composant.',
		},
		icon: {
			options: IconsList.filter((i) => !i.deprecated).map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Modifie le glyphe de l’icône.',
		},
		alt: {
			description: 'Information restituée par le lecteur d’écran.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BubbleIconComponent],
		}),
	],
	render: ({ bubbleDirection, alt, palette, size, ...args }, { argTypes }) => {
		const sizeArg = size === 'M' ? `` : ` size="${size}"`;
		const directionArg = bubbleDirection === 'random' ? `` : ` bubbleDirection="${bubbleDirection}"`;
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
		bubbleDirection: 'random',
		palette: 'product',
		size: 'M',
		alt: '',
	},
};

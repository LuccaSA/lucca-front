//import { DecorativeIconComponent } from '@lucca-front/ng/';
import { IconsList } from '@/stories/icons-list';
import { BUBBLE_ICON_DIRECTION, BUBBLE_ICON_SIZE, BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { DECORATIVE_PALETTE, PALETTE, PRODUCT_PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Bubble icon/Angular/Basic',
	argTypes: {
		bubbleDirection: {
			options: [...BUBBLE_ICON_DIRECTION],
			control: {
				type: 'select',
			},
			description: 'Définit une direction de la bulle. Aléatoire par défaut.',
			table: { category: 'inputs', defaultValue: { summary: 'random' } },
		},
		size: {
			options: [...BUBBLE_ICON_SIZE],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs', defaultValue: { summary: 'M' } },
		},
		palette: {
			options: [...PALETTE, ...PRODUCT_PALETTE, ...DECORATIVE_PALETTE],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.',
			table: { category: 'inputs', defaultValue: { summary: 'product' } },
		},
		icon: {
			options: IconsList.filter((i) => !i.deprecated).map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Modifie le glyphe de l’icône.',
			table: { category: 'inputs' },
		},
		alt: {
			description: 'Information restituée par le lecteur d’écran.',
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BubbleIconComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			styles: [`:host { display: flex; gap: var(--pr-t-spacings-50) }`],
			template: `<lu-bubble-icon${generateInputs(args, argTypes)} />\n`.repeat(4),
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

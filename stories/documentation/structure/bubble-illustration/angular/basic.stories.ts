import { BUBBLE_ILLUSTRATION, BUBBLE_ILLUSTRATION_SIZE, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { DECORATIVE_PALETTE, PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Bubble illustration/Angular/Basic',
	argTypes: {
		illustration: {
			options: [...BUBBLE_ILLUSTRATION],
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration. Accepte aussi l’URL d’un SVG personnalisé, commençant par <code>https://</code> ou <code>/</code>. Requis.',
			table: { category: 'inputs' },
		},
		size: {
			options: [...BUBBLE_ILLUSTRATION_SIZE],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs', defaultValue: { summary: 'M' } },
		},
		palette: {
			options: [...PALETTE, ...DECORATIVE_PALETTE],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.',
			table: { category: 'inputs', defaultValue: { summary: 'product' } },
		},
		action: {
			description: 'Ajoute une icône d’action (+) à l’illustration.',
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BubbleIllustrationComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-bubble-illustration${generateInputs(args, argTypes)} />`),
		};
	},
} as Meta;

export const Basic: StoryObj<BubbleIllustrationComponent & { palette: string }> = {
	args: {
		illustration: 'anniversary',
		palette: 'product',
		action: false,
		size: 'M',
	},
};

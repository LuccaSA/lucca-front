import { BUBBLE_ILLUSTRATION_SIZE, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { DECORATIVE_PALETTE, PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs, setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Bubble illustration/Angular/Basic',
	argTypes: {
		illustration: {
			options: setStoryOptions(BUBBLE_ILLUSTRATION_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration.',
		},
		size: {
			options: setStoryOptions(BUBBLE_ILLUSTRATION_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		palette: {
			options: setStoryOptions([...PALETTE, ...DECORATIVE_PALETTE]),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.',
		},
		action: {
			description: 'Ajoute une icône d’action (+) à l’illustration.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BubbleIllustrationComponent],
		}),
	],
	render: ({ palette, size, ...args }, { argTypes }) => {
		const paletteArg = palette !== 'product' ? ` palette="${palette}"` : ``;
		const sizeArg = size === 'M' ? `` : ` size="${size}"`;
		return {
			template: cleanupTemplate(`<lu-bubble-illustration${sizeArg}${paletteArg}${generateInputs(args, argTypes)} />`),
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

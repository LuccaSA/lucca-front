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
		disabled: {
			description: 'Désactive le bouton.',
		},
		palette: {
			options: ['', 'success', 'warning', 'error', 'product', 'brand', 'neutral', 'none', 'primary', 'grey'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au bouton.',
		},
		inverted: {
			if: { arg: 'disabled', truthy: false },
			description: 'Modifie les couleurs du bouton pour un usage sur fond foncé.',
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du bouton.',
		},
		alt: {
			description: "Information restituée par le lecteur d'écran.",
		},
		hidden: {
			description: 'Masque le bouton.',
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

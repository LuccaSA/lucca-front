import { CLEAR_SIZE, ClearComponent } from '@lucca-front/ng/clear';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

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
			props: {
				...args,
			},
			template: `<lu-clear${hiddenAttr}${sizeAttr}${paletteAttr}${generateInputs(inputArgs, argTypes)} (onClear)="onClear($event)">${alt}</lu-clear>`,
		};
	},
} as Meta;

export const Template: StoryObj = {
	argTypes: {
		disabled: {
			description: 'Désactive le bouton.',
			table: { category: 'inputs' },
		},
		inverted: {
			name: '↳ inverted',
			if: { arg: 'disabled', truthy: false },
			description: 'Modifie les couleurs du bouton pour un usage sur fond foncé.',
			table: { category: 'inputs' },
		},
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au bouton.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(CLEAR_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du bouton.',
			table: { category: 'inputs' },
		},
		alt: {
			description: 'Information restituée par le lecteur d’écran.',
			table: { category: 'inputs' },
		},
		hidden: {
			description: 'Masque le bouton.',
			table: { category: 'inputs' },
		},
		onClear: {
			description: 'Événement déclenché lors du clic sur le bouton.',
			action: 'onClear',
			control: false,
			table: { category: 'outputs', type: { summary: 'T' } },
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

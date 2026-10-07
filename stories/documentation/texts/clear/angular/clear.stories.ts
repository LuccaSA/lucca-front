import { CLEAR_SIZE, ClearComponent, luClearTranslations } from '@lucca-front/ng/clear';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Texts/Clear/Angular/Basic',
	argTypes: {
		intl: intlArgType(luClearTranslations, 'LuClearLabel'),
	},
	decorators: [
		moduleMetadata({
			imports: [ClearComponent],
		}),
	],

	render: (args, { argTypes }) => {
		const { alt, hidden, ...inputArgs } = args;
		const hiddenAttr = hidden ? ` hidden` : ``;
		// The projected label is only displayed when it carries the `#content` template ref (see ClearComponent.contentRef)
		const altContent = alt ? `<span #content>${alt}</span>` : ``;
		return {
			props: {
				...args,
			},
			template: `<lu-clear${hiddenAttr}${generateInputs(inputArgs, argTypes)} (onClear)="onClear($event)">${altContent}</lu-clear>`,
		};
	},
} as Meta;

export const Template: StoryObj = {
	argTypes: {
		disabled: {
			description: 'Désactive le bouton.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au bouton.',
			table: { category: 'inputs', defaultValue: { summary: 'none' } },
		},
		inverted: {
			if: { arg: 'disabled', truthy: false },
			description: 'Modifie les couleurs du bouton pour un usage sur fond foncé.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		size: {
			options: setStoryOptions(CLEAR_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du bouton. Par défaut : taille M.',
			table: { category: 'inputs' },
		},
		alt: {
			description: 'Information restituée par le lecteur d’écran (contenu projeté portant la référence <code>#content</code>). Par défaut : traduction <code>intl.clear</code>.',
			table: { category: 'content' },
		},
		hidden: {
			description: 'Masque le bouton (attribut HTML natif).',
			table: { category: 'attributes' },
		},
		onClear: {
			description: 'Événement déclenché lors du clic sur le bouton.',
			action: 'onClear',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
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

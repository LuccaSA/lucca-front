import { NUMERIC_BADGE_SIZE, NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/NumericBadge/Angular/Basic',
	component: NumericBadgeComponent,
	decorators: [
		moduleMetadata({
			entryComponents: [NumericBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.',
		},
		value: {
			description: 'Valeur affichée par le composant. Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.)',
		},
		maxValue: {
			type: 'number',
			description: '[v19.2] Valeur maximale affichée au format "999+".',
		},
		disableTooltip: {
			type: 'boolean',
			description: "Empêche le déclanchement d'une tooltip si la valeur est supérieure à <code>maxValue</code>.",
		},
		size: {
			options: setStoryOptions(NUMERIC_BADGE_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		loading: {
			control: {
				type: 'boolean',
			},
			description: "[v19.1] Applique l'état de chargement.",
		},
	},
	render: (args, { argTypes }) => {
		const { value, ...inputs } = args;
		return {
			template: `<lu-numeric-badge ${generateInputs(inputs, argTypes)} [value]="${value}" />`,
		};
	},
} as Meta;

export const Template: StoryObj<NumericBadgeComponent> = {
	args: {
		value: 7,
		maxValue: 999,
		loading: false,
		disableTooltip: false,
	},
};

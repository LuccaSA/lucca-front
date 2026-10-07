import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { NUMERIC_BADGE_SIZE, NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/NumericBadge/Angular/Basic',
	component: NumericBadgeComponent,
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au composant.',
			table: { category: 'inputs', defaultValue: { summary: 'none' } },
		},
		value: {
			control: {
				type: 'text',
			},
			description: 'Valeur affichée par le composant. Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.)',
			table: { category: 'inputs' },
		},
		maxValue: {
			control: {
				type: 'number',
			},
			description: 'Valeur maximale affichée au format "999+".',
			table: { category: 'inputs', defaultValue: { summary: '999' } },
		},
		disableTooltip: {
			control: {
				type: 'boolean',
			},
			description: 'Empêche le déclenchement d’une tooltip si la valeur est supérieure à <code>maxValue</code>.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		size: {
			options: setStoryOptions(NUMERIC_BADGE_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		loading: {
			control: {
				type: 'boolean',
			},
			description: 'Applique l’état de chargement.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
	},
	render: (args, { argTypes }) => {
		const { value, ...inputs } = args;
		// A numeric value is bound as a number (so that `maxValue` applies), any other value as a plain string ("3/5", "999+"…).
		const valueBinding = typeof value === 'number' || /^\d+$/.test(value) ? `[value]="${value}"` : `value="${value}"`;
		return {
			template: `<lu-numeric-badge ${generateInputs(inputs, argTypes)} ${valueBinding} />`,
		};
	},
} as Meta;

export const Template: StoryObj<NumericBadgeComponent> = {
	args: {
		value: 7,
		loading: false,
		disableTooltip: false,
	},
};

import { BUTTON_SIZE, BUTTON_STATE, BUTTON_TYPE, ButtonComponent } from '@lucca/prisme/button';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Counter',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent],
		}),
	],
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}>Button<lu-numeric-badge disableTooltip [value]="9999" /></button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent> = {
	argTypes: {
		luButton: {
			options: setStoryOptions(BUTTON_TYPE),
			control: {
				type: 'select',
			},
			description: 'Modifie la hierarchie ou le style du bouton.<br>[v20.3] AI',
			table: { category: 'inputs', defaultValue: { summary: '' } },
		},
		block: {
			description: 'Applique <code>display: block</code>.',
			table: { category: 'inputs' },
		},
		palette: {
			if: { arg: 'luButton', neq: 'AI' },
			description: 'Applique une palette de couleurs au bouton.',
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: 'none' } },
		},
		state: {
			description: 'Modifie l’état du bouton.',
			options: setStoryOptions(BUTTON_STATE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: 'default' } },
		},
		critical: {
			description: '[v20.2] Marque une action aux conséquences importantes ou irréversibles au survol et focus. Seulement compatible avec <code>outlined</code> et <code>ghost</code>.',
			table: { category: 'inputs' },
		},
		disclosure: {
			description: 'Indique la présence d’un menu.',
			table: { category: 'inputs' },
		},
		delete: {
			description: '[Deprecated] Remplacé par <code>critical</code>.',
			table: { disable: true },
		},
		size: {
			description: 'Modifie la taille du composant.',
			options: setStoryOptions(BUTTON_SIZE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
	},
	args: {
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		critical: false,
	},
};

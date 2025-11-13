import { ButtonComponent } from '@lucca-front/ng/button';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { expect, within } from 'storybook/test';
import { BasicTEST as ButtonBasic } from './button-basic.stories';

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
			options: ['', 'outlined', 'ghost', 'ghost-invert', 'AI'],
			control: {
				type: 'select',
			},
			description: 'Modifie la hierarchie ou le style du bouton.<br>[v20.3] AI',
		},
		block: {
			description: 'Applique <code>display: block</code>.',
		},
		palette: {
			if: { arg: 'luButton', neq: 'AI' },
			description: 'Applique une palette de couleurs au bouton.',
		},
		state: {
			description: 'État du composant.',
			control: {
				type: 'select',
			},
		},
		critical: {
			description: '[v20.2] Marque une action aux conséquences importantes ou irréversibles au survol et focus. Seulement compatible avec <code>outlined</code> et <code>ghost</code>.',
		},
		disclosure: {
			description: "Indique le présence d'un menu.",
		},
		delete: {
			description: '[Deprecated] Remplacé par <code>critical</code>.',
		},
		size: {
			description: 'Modifie la taille du composant.',
			control: {
				type: 'select',
			},
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

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	await ButtonBasic.play(context);
	const button = await canvas.findByRole('button');
	const counter = await within(button).findByText('999+');
	await expect(counter).toBeInTheDocument();
});

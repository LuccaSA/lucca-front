import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { expect, within } from 'storybook/test';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: ({ luButton, ...inputs }, { argTypes }) => {
		const disclosureIcon = '<lu-icon icon="arrowChevronBottom" />';
		return {
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}
>Button${inputs['disclosure'] ? disclosureIcon : ''}</button>`,
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
		luButton: '',
		state: 'default',
		critical: false,
		disclosure: false,
		palette: 'none',
		block: false,
		delete: false,
	},
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	const button = await canvas.findByRole('button');
	await expect(button).toHaveClass('button is-default palette-none');
});

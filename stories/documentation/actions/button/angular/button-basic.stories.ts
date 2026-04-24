import { BUTTON_SIZE, BUTTON_STATE, BUTTON_TYPE, ButtonComponent } from '@lucca/prisme/button';
import { PALETTE } from '@lucca/prisme/core';
import { Meta, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { expect, within } from 'storybook/test';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	render: ({ luButton, ...inputs }, { argTypes }) => {
		const disclosureIcon = '<lu-icon icon="arrowChevronBottom" />';
		return {
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}
>Button</button>`,
			styles: [luButton === 'AI-invert' || luButton === 'ghost-invert' ? ':host { background-color: var(--palettes-neutral-900); outline: 1rem solid var(--palettes-neutral-900);  }' : ''],
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
		},
		block: {
			description: 'Applique <code>display: block</code>.',
		},
		palette: {
			if: { arg: 'luButton', neq: 'AI' },
			description: 'Applique une palette de couleurs au bouton.',
			options: setStoryOptions(PALETTE),
			control: {
				type: 'select',
			},
		},
		state: {
			description: 'Modifie l’état du bouton.',
			options: setStoryOptions(BUTTON_STATE),
			control: {
				type: 'select',
			},
		},
		critical: {
			description:
				"[v20.2] Marque une action aux conséquences importantes ou irréversibles au survol et focus. Seulement compatible avec <code>outlined</code> et <code>ghost</code>. Dans le cas d’un bouton toujours affiché en rouge, préférez l’usage de <code>palette='critical'</code>.",
		},
		disclosure: {
			description: 'Indique la présence d’un menu.',
		},
		delete: {
			description: '[Deprecated] Remplacé par <code>critical</code>.',
		},
		size: {
			description: 'Modifie la taille du composant.',
			options: setStoryOptions(BUTTON_SIZE),
			control: {
				type: 'select',
			},
		},
	},
	args: {
		luButton: '',
		delete: false,
		state: 'default',
		critical: false,
		disclosure: false,
		palette: 'none',
		block: false,
	},
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	const button = await canvas.findByRole('button');
	await expect(button).toHaveClass('button is-default palette-none');
});

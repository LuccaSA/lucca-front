import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { expect, within } from 'storybook/test';
import { BasicTEST as ButtonBasic } from './button-basic.stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Icon',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: ({ luButton, label, ...inputs }, { argTypes }) => {
		let iconSign = 'signInfo';
		const labelCopy = label;
		if (inputs['disclosure'] === true) {
			iconSign = 'arrowChevronBottom';
			label = '';
		}
		return {
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(
				inputs,
				argTypes,
			)}>${inputs['disclosure'] ? labelCopy : ''}<lu-icon icon="${iconSign}" alt="Alt text" />${label}</button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent & { label: string }> = {
	argTypes: {
		label: {
			description: '[Story] Modifie le label du boutton.',
		},
		luButton: {
			options: ['', 'outlined', 'ghost', 'ghost-invert', 'AI', 'AI-invert'],
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
			options: ['', 'product', 'neutral', 'success', 'warning', 'critical'],
			control: {
				type: 'select',
			},
		},
		state: {
			description: "Modifie l'état du bouton.",
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
		label: 'Button',
		critical: false,
		disclosure: false,
	},
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	await ButtonBasic.play(context);
	const button = await canvas.findByRole('button');
	if (context.args.label) {
		await expect(button).toHaveClass('mod-withIcon');
	} else {
		await expect(button).toHaveClass('mod-onlyIcon');
	}
});

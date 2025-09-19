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
			description: "La présence d'un label augmente le padding horizontal automatiquement via la classe <code>mod-withIcon</code>",
		},
		luButton: {
			options: ['', 'outlined', 'ghost', 'ghost-invert', 'AI'],
			control: {
				type: 'select',
			},
		},
		palette: {
			if: { arg: 'luButton', neq: 'AI' },
		},
		critical: {
			description: '[v20.2] Couleur critical au hover / focus',
		},
		size: {
			control: {
				type: 'select',
			},
		},
		delete: {
			description: 'Deprecated 💀, use critical instead',
		},
	},
	args: {
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		label: 'Label',
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

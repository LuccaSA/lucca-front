import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, within } from '@storybook/test';
import { generateInputs } from 'stories/helpers/stories';
import { Basic as ButtonBasic } from './button-basic.stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Icon',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: ({ luButton, label, ...inputs }, { argTypes }) => {
		let iconSign = "signInfo";
		const labelCopy = label;
		if(inputs['disclosure'] === true ) {
			iconSign = "arrowChevronBottom";
			label = "";
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
			options: ['', 'outlined', 'text', 'text-invert'],
			control: {
				type: 'select',
			},
		},
		delete: {
			description: '[v18.1] Couleur critical au hover / focus',
		},
		size: {
			control: {
				type: 'select',
			},
		},
	},
	play: async (context) => {
		const canvas = within(context.canvasElement);
		await ButtonBasic.play(context);
		const button = await canvas.findByRole('button');
		if (context.args.label) {
			await expect(button).toHaveClass('mod-withIcon');
		} else {
			await expect(button).toHaveClass('mod-onlyIcon');
		}
	},
	args: {
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		label: 'Label',
		delete: false,
		disclosure: false,
	},
};

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
			description: '[v20.3] AI',
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
		critical: false,
		disclosure: false,
	},
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	const button = await canvas.findByRole('button');
	await expect(button).toHaveClass('button is-default palette-none');
});

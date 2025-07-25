import { ButtonComponent } from '@lucca-front/ng/button';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs } from 'stories/helpers/stories';
import { BasicTEST as ButtonBasic } from './button-basic.stories';
import { within, expect } from 'storybook/test';

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
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}>Button<lu-numeric-badge disableTooltip [value]="9999"></lu-numeric-badge></button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent> = {
	argTypes: {
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
	args: {
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		delete: false,
	},
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	await ButtonBasic.play(context);
	const button = await canvas.findByRole('button');
	const counter = await within(button).findByText('999+');
	await expect(counter).toBeInTheDocument();
});

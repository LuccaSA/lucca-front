import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}
>Button</button>`,
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
	},
	args: {
		size: 'M',
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
	},
};

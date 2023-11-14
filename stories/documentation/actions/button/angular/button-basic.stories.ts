import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			template: `<button luButton${luButton !== 'default' ? `="${luButton}"` : ''}  ${generateInputs(inputs, argTypes)}
>Click me !</button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent> = {
	args: {
		size: 'M',
		block: false,
		palette: 'none',
		state: 'default',
		luButton: 'default',
	},
};

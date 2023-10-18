import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';

export default {
	title: 'Documentation/Actions/Button/Angular',
	component: ButtonComponent,
	render: ({ size, block, palette, state, buttonStyle }) => {
		return {
			template: `<button luButton 
${size !== 'M' ? `size=${size}` : ''}
${block ? 'block' : ''}
${palette !== 'none' ? `palette=${palette}` : ''}
${state !== 'default' ? `state=${state}` : ''}
${buttonStyle !== 'default' ? `buttonStyle=${buttonStyle}` : ''}
>Click me !</button>`,
		};
	},
} as Meta;

export const Template: StoryObj<ButtonComponent> = {
	args: {
		size: 'M',
		block: false,
		palette: 'none',
		state: 'default',
		buttonStyle: 'default',
	},
};

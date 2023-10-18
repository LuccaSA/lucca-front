import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';

export default {
	title: 'Documentation/Actions/Button/Angular',
	component: ButtonComponent,
	render: ({ size, block, palette, state, luButton }) => {
		return {
			template: `<button luButton 
${size !== 'M' ? `size=${size}` : ''}
${block ? 'block' : ''}
${palette !== 'none' ? `palette=${palette}` : ''}
${state !== 'default' ? `state=${state}` : ''}
${luButton !== 'default' ? `luButton=${luButton}` : ''}
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
		luButton: 'default',
	},
};

import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';

export default {
	title: 'Documentation/Actions/Button/Angular/Basic',
	component: ButtonComponent,
	render: ({ size, block, palette, state, luButton }) => {
		return {
			template: `<button luButton${luButton !== '' ? `="${luButton}"` : ''} 
${size !== 'M' ? `size=${size}` : ''}
${block ? 'block' : ''}
${palette !== 'none' ? `palette=${palette}` : ''}
${state !== 'default' ? `state=${state}` : ''}
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
		luButton: '',
	},
};

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';

export default {
	title: 'Documentation/Actions/Button/Angular/Icon',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: ({ size, block, palette, state, luButton }) => {
		return {
			template: `<button luButton${luButton !== '' ? `="${luButton}"` : ''} 
${size !== 'M' ? `size=${size}` : ''}
${block ? 'block' : ''}
${palette !== 'none' ? `palette=${palette}` : ''}
${state !== 'default' ? `state=${state}` : ''}
><lu-icon icon="signInfo"></lu-icon> Click me !</button>`,
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

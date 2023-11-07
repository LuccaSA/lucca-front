import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';

export default {
	title: 'Documentation/Actions/Button/Angular/Counter',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent],
		}),
	],
	render: ({ size, block, palette, state, luButton }) => {
		return {
			template: `<button luButton${luButton !== 'default' ? `="${luButton}"` : ''} 
${size !== 'M' ? `size=${size}` : ''}
${block ? 'block' : ''}
${palette !== 'none' ? `palette=${palette}` : ''}
${state !== 'default' ? `state=${state}` : ''}
>Click me ! <lu-numeric-badge value="7" palette="primary"></lu-numeric-badge></button>`,
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

import { ButtonComponent } from '@lucca-front/ng/button';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

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
			template: `<button type="button" luButton${luButton !== '' ? `="${luButton}"` : ''}${generateInputs(inputs, argTypes)}>Button<lu-numeric-badge value="7" palette="product"></lu-numeric-badge></button>`,
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
		}
	},
	args: {
		size: 'M',
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		delete: false,
	},
};

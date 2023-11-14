import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Actions/Button/Angular/Icon',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			template: `<button luButton${luButton !== 'default' ? `="${luButton}"` : ''} ${generateInputs(inputs, argTypes)}><lu-icon icon="signInfo"></lu-icon> Click me !</button>`,
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

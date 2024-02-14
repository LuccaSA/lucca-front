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
	render: ({ luButton, label, ...inputs }, { argTypes }) => {
		return {
			template: `<button luButton${luButton !== '' ? `="${luButton}"` : ''} ${generateInputs(inputs, argTypes)}><lu-icon icon="signInfo"></lu-icon>${label}</button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent & {label: string}> = {
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
		label: '',
	},
};

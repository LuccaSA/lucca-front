import { Meta, StoryObj } from '@storybook/angular';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';

export default {
	title: 'Documentation/Forms/InlineMessage/Basic',
	component: InlineMessageComponent,
	argTypes: {
		state: {
			options: ['success', 'warning', 'error', 'default'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['S', 'M'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<InlineMessageComponent> = {
	args: {
		state: 'success',
		size: 'M',
		label: 'Inline message',
	},
};

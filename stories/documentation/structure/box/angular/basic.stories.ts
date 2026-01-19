import { BoxComponent } from '@lucca-front/ng/box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Box/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
	],
	render: ({ content, ...args }, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-box ${generateInputs(args, argTypes)}>${content}</lu-box>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxComponent & { content: string }> = {
	args: {
		content: 'Lorem ipsum dolor sit amet.',
		toggle: false,
		neutral: false,
		killable: false,
		withArrow: false,
	},
};

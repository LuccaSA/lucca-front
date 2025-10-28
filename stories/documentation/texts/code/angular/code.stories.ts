import { codeComponent } from '@lucca-front/ng/code';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface CodeBasicStory {
	block: boolean;
	content: string;
}

export default {
	title: 'Documentation/Texts/Code/Angular/Basic',
	argTypes: {
		block: {
			type: 'boolean',
		},
		content: {
			control: {
				type: 'text',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [codeComponent],
		}),
	],
	render: (args: CodeBasicStory) => {
		const blockParam = args.block ? ` block` : ``;
		return {
			template: cleanupTemplate(`<lu-code${blockParam}>${args?.content}</lu-code$>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		block: false,
		content: 'ipsum dolor sit',
	},
};

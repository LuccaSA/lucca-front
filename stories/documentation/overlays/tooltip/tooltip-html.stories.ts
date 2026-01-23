import { Meta, StoryObj } from '@storybook/angular';

interface BasicStory {
	content: string;
	inline: string;
	block: string;
}

export default {
	title: 'Documentation/Overlays/Tooltip/HTML&CSS',
	argTypes: {
		inline: {
			options: ['', 'before', 'after'],
			control: {
				type: 'select',
			},
		},
		block: {
			options: ['', 'above', 'below'],
			control: {
				type: 'select',
			},
		},
		content: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

function getTemplate(args: BasicStory): string {
	const inline = args.inline ? ' is-' + args.inline : '';
	const block = args.block ? ' is-' + args.block : '';
	return `<div class="tooltip${inline}${block}">{{ content }}</div>`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: { content: 'Lorem ipsum dolor sit amet', inline: '', block: '' },
	render: Template,
};

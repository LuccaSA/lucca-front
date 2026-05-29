import { Meta, StoryObj } from '@storybook/angular';

interface TextHighlightStory {
	size: string;
}

export default {
	title: 'Documentation/Texts/Highlight Text/HTML&CSS/Sizes',
	argTypes: {
		size: {
			options: ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'body-M', 'body-S', 'body-XS'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du texte.',
		},
	},
} as Meta;

function getTemplate(args: TextHighlightStory): string {
	return `<div style="font: var(--pr-t-font-${args.size})">Lorem <strong class="highlightText">ipsum</strong> dolor</div>`;
}

const Template = (args: TextHighlightStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<TextHighlightStory> = {
	args: {
		size: 'heading-1',
	},
	render: Template,
};

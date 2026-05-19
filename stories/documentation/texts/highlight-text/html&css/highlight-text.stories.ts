import { Meta, StoryObj } from '@storybook/angular';

interface TextHighlightStory {}

export default {
	title: 'Documentation/Texts/Highlight Text/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: TextHighlightStory): string {
	return `<h1>Lorem <strong class="highlightText">ipsum</strong> dolor</h1>`;
}

const Template = (args: TextHighlightStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<TextHighlightStory> = {
	args: {},
	render: Template,
};

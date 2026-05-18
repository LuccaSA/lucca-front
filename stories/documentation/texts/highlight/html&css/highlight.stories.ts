import { Meta, StoryObj } from '@storybook/angular';

interface TextHighlightStory {}

export default {
	title: 'Documentation/Texts/Highlight/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: TextHighlightStory): string {
	return `<h1>Lorem <strong class="highlight">ipsum</strong> dolor</h1>`;
}

const Template = (args: TextHighlightStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<TextHighlightStory> = {
	args: {},
	render: Template,
};

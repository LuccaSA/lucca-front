import { Meta, StoryFn } from '@storybook/angular';

interface InlineMessageSizeStory {}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML & CSS/Size',
	argTypes: {},
} as Meta;

function getTemplate(args: InlineMessageSizeStory): string {
	return `<div class="inlineMessage mod-S"><p class="inlineMessage-content">Inline message</p></div>`;
}

const Template: StoryFn<InlineMessageSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Size = Template.bind({});
Size.args = {};

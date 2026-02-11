import { Meta, StoryObj } from '@storybook/angular';

interface InlineMessageSizeStory {}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML&CSS/Size',
	argTypes: {},
} as Meta;

function getTemplate(args: InlineMessageSizeStory): string {
	return `
<div class="inlineMessage mod-S">
	<p class="inlineMessage-content">Inline message</p>
</div>
`;
}

const Template = (args: InlineMessageSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Size: StoryObj<InlineMessageSizeStory> = {
	args: {},
	render: Template,
};

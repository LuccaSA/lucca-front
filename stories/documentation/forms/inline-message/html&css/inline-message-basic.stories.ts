import { Meta, StoryObj } from '@storybook/angular';

interface InlineMessageBasicStory {}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: InlineMessageBasicStory): string {
	return `
<div class="inlineMessage">
	<p class="inlineMessage-content">Inline message</p>
</div>
`;
}

const Template = (args: InlineMessageBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<InlineMessageBasicStory> = {
	args: {},
	render: Template,
};

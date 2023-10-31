import { Meta, Story } from '@storybook/angular';

interface InlineMessageBasicStory {
}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML & CSS/Basic',
	argTypes: {
	},
} as Meta;

function getTemplate(args: InlineMessageBasicStory): string {
	return `<div class="inlineMessage">Inline message</div>`;
}

const Template: Story<InlineMessageBasicStory> = (args: InlineMessageBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};

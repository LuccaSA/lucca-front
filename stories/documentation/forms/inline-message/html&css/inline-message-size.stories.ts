import { Meta, Story } from '@storybook/angular';

interface InlineMessageSizeStory {
}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML & CSS/Size',
	argTypes: {
	},
} as Meta;

function getTemplate(args: InlineMessageSizeStory): string {
	return `<div class="inlineMessage mod-S">Inline message</div>`;
}

const Template: Story<InlineMessageSizeStory> = (args: InlineMessageSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Size = Template.bind({});
Size.args = {};

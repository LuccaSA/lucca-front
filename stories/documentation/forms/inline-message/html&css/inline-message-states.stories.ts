import { Meta, StoryFn } from '@storybook/angular';

interface InlineMessageStatesStory {}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML & CSS/States',
	argTypes: {},
} as Meta;

function getTemplate(args: InlineMessageStatesStory): string {
	return `
<div class="inlineMessage is-success">
	<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
	<p class="inlineMessage-content">
		Inline message
	</p>
</div>
<div class="inlineMessage is-warning">
	<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
	<p class="inlineMessage-content">
		Inline message
	</p>
</div>
<div class="inlineMessage is-error">
	<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
	<p class="inlineMessage-content">
		Inline message
	</p>
</div>
`;
}

const Template: StoryFn<InlineMessageStatesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const States = Template.bind({});
States.args = {};

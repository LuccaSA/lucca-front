import { Meta, StoryFn } from '@storybook/angular';

interface InlineMessageStatesStory {}

export default {
	title: 'Documentation/Forms/InlineMessage/HTML & CSS/States',
	argTypes: {},
} as Meta;

function getTemplate(args: InlineMessageStatesStory): string {
	return `
<div class="inlineMessage is-success">
	<p class="inlineMessage-content">
		<span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>
		Inline message
	</p>
</div>
<div class="inlineMessage is-warning">
	<p class="inlineMessage-content">
		<span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>
		Inline message
	</p>
</div>
<div class="inlineMessage is-error">
	<p class="inlineMessage-content">
		<span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>
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

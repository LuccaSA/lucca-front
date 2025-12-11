import { Meta, StoryObj } from '@storybook/angular';

interface ActionStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Action',
	argTypes: {},
} as Meta;

function getTemplate(args: ActionStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
		<dd class="highlightData-content-action"><button type="button" class="button mod-outlined">Action</button></dd>
	</dl>
</div>`;
}

const Template = (args: ActionStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Action: StoryObj<ActionStory> = {
	args: {},
	render: Template,
};

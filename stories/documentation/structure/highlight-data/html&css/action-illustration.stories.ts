import { Meta, StoryFn } from '@storybook/angular';

interface ActionIllustrationStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Action & illustration',
	argTypes: {},
} as Meta;

function getTemplate(args: ActionIllustrationStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
		<dd class="highlightData-content-action"><button type="button" class="button mod-outlined">Action</button></dd>
	</dl>
	<div class="highlightData-illustrations">
		<img
			alt=""
			class="highlightData-illustrations-back"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg"
		/>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/polaroid-male.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<ActionIllustrationStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ActionIllustration = Template.bind({});
ActionIllustration.args = {};

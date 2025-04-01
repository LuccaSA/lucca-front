import { Meta, StoryFn } from '@storybook/angular';

interface OnlyBubbleStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Only bubble',
	argTypes: {},
} as Meta;

function getTemplate(args: OnlyBubbleStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<img
			alt=""
			class="highlightData-illustrations-back"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<OnlyBubbleStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const OnlyBubble = Template.bind({});
OnlyBubble.args = {};

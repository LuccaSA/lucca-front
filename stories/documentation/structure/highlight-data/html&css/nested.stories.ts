import { Meta, StoryFn } from '@storybook/angular';

interface SampleNestedStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Nested',
	argTypes: {},
} as Meta;

function getTemplate(args: SampleNestedStory): string {
	return `<div class="highlightData mod-nested">
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
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<SampleNestedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Nested = Template.bind({});
Nested.args = {};

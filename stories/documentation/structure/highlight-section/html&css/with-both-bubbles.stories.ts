import { Meta, StoryFn } from '@storybook/angular';

interface WithBothBubblesStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/With both bubbles',
	argTypes: {},
} as Meta;

function getTemplate(args: WithBothBubblesStory): string {
	return `<div class="highlightSection mod-dark">
	<div class="highlightSection-content">
		<div class="textFlow">
			<h2>Title</h2>
			<p>First paragraph. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<p>Second paragraph shows a <a luLink>Link</a>.</p>
		</div>
	</div>

	<div class="highlightSection-illustrations">
		<img
			alt=""
			class="highlightSection-illustrations-back-top"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-dark-4.svg"
		/>
		<img
			alt=""
			class="highlightSection-illustrations-back-bottom"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-dark-1.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<WithBothBubblesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const WithBothBubblesStory = Template.bind({});
WithBothBubblesStory.args = {};

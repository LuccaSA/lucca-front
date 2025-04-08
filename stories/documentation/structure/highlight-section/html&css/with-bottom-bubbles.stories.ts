import { Meta, StoryFn } from '@storybook/angular';

interface WithBottomBubblesStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/With bottom bubbles',
	argTypes: {},
} as Meta;

function getTemplate(args: WithBottomBubblesStory): string {
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
			class="highlightSection-illustrations-back-bottom"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-dark-4.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<WithBottomBubblesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const WithBottomBubblesStory = Template.bind({});
WithBottomBubblesStory.args = {};

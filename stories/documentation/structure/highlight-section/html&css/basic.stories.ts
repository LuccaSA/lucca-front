import { Meta, StoryFn } from '@storybook/angular';

interface SampleBasicStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: SampleBasicStory): string {
	return `<div class="highlightSection">
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
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg"
		/>
		<img
			alt=""
			class="highlightSection-illustrations-back-bottom"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-2.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<SampleBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};

import { Meta, StoryFn } from '@storybook/angular';

interface ThemeStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Themes',
	argTypes: {},
} as Meta;

function getTemplate(args: ThemeStory): string {
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
</div>

<div class="highlightSection mod-light">
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
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-4.svg"
		/>
		<img
			alt=""
			class="highlightSection-illustrations-back-bottom"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg"
		/>
	</div>
</div>`;
}

const Template: StoryFn<ThemeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-100);
		}`,
	],
});

export const Theme = Template.bind({});
Theme.args = {};

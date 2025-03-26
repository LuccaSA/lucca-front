import { Meta, StoryFn } from '@storybook/angular';

interface ThemeStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Themes',
	argTypes: {},
} as Meta;

function getTemplate(args: ThemeStory): string {
	return `<div class="highlightData mod-light">
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
</div>

<div class="highlightData mod-dark">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<img
			alt=""
			class="highlightData-illustrations-back"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-dark-1.svg"
		/>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
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

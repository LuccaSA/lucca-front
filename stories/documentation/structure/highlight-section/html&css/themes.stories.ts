import { Meta, StoryObj } from '@storybook/angular-vite';

interface ThemeStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Themes',
	argTypes: {},
} as Meta;

function getTemplate(args: ThemeStory): string {
	return `<div class="highlightSection">
	<img alt="" class="highlightSection-bubbleStart" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg" />
	<img alt="" class="highlightSection-bubbleEnd" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg" />
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">White</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<img alt="" class="highlightSection-bubbleStart" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg" />
	<img alt="" class="highlightSection-bubbleEnd" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg" />
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Light</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-dark">
	<img alt="" class="highlightSection-bubbleStart" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg" />
	<img alt="" class="highlightSection-bubbleEnd" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg" />
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Dark</p>
		</div>
	</div>
</div>`;
}

const Template = (args: ThemeStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-200);
		}`,
	],
});

export const Theme: StoryObj<ThemeStory> = {
	args: {},
	render: Template,
};

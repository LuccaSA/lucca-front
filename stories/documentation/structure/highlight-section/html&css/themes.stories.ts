import { Meta, StoryObj } from '@storybook/angular-vite';

interface ThemeStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Themes',
	argTypes: {},
} as Meta;

function getSection(modifier: string, bubbleTheme: string, label: string): string {
	return `<div class="highlightSection${modifier ? ` ${modifier}` : ''}">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">${label}</p>
		</div>
	</div>
	<div class="highlightSection-bubbles">
		<img alt="" class="highlightSection-bubbles-start" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-${bubbleTheme}-1.svg" />
		<img alt="" class="highlightSection-bubbles-end" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-${bubbleTheme}-1.svg" />
	</div>
</div>`;
}

function getTemplate(args: ThemeStory): string {
	return [getSection('', 'light', 'White — sur fond gris'), getSection('mod-light', 'light', 'Light — sur fond blanc'), getSection('mod-dark', 'dark', 'Dark — sur fond gris ou blanc')].join('\n\n');
}

const Template = (args: ThemeStory) => ({
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

export const Theme: StoryObj<ThemeStory> = {
	args: {},
	render: Template,
};

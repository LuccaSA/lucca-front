import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface ThemeStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Themes',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: ThemeStory): string {
	return `<div class="highlightSection">
	<div class="highlightSection-bubbleStart" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-bubbleEnd" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">White</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-bubbleEnd" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Light</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-dark">
	<div class="highlightSection-bubbleStart" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-bubbleEnd" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
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

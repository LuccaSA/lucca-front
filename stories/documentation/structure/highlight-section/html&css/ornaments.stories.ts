import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface OrnamentStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Ornaments',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: OrnamentStory): string {
	return `<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-bubbleEnd" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Both</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Start</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleEnd" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">End</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">None</p>
		</div>
	</div>
</div>`;
}

const Template = (args: OrnamentStory) => ({
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

export const Ornaments: StoryObj<OrnamentStory> = {
	args: {},
	render: Template,
};

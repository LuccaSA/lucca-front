import { HttpClientModule } from '@angular/common/http';
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

interface FancyBoxBasicStory {}

export default {
	title: 'Documentation/Structure/FancyBox/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [FancyBoxComponent, LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	return `<div class="fancyBox">
    <div class="fancyBox-content">
		<div class="fancyBox-content-backgroundEndStart" [innerHtml]="'${CDN_URL}/transverse/prisme/visuals/fancy-box/background-end-start-plant.svg' | luSafeExternalSvg"></div>
		<div class="fancyBox-content-backgroundStartEnd" [innerHtml]="'${CDN_URL}/transverse/prisme/visuals/fancy-box/background-start-end-candies.svg' | luSafeExternalSvg"></div>
		<div class="fancyBox-content-foregroundStartEnd" [innerHtml]="'${CDN_URL}/transverse/prisme/visuals/fancy-box/foreground-start-end-pizza.svg' | luSafeExternalSvg"></div>
		<div class="fancyBox-content-foregroundEndStart" [innerHtml]="'${CDN_URL}/transverse/prisme/visuals/fancy-box/foreground-end-start-clips.svg' | luSafeExternalSvg"></div>
		Content<br />Content<br />Content<br />Content<br />Content<br />Content
	</div>
</div>`;
}

const Template = (args: FancyBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: block;
				padding-block: var(--pr-t-spacings-400);
			}
		`,
	],
});

export const Basic: StoryObj<FancyBoxBasicStory> = {
	args: {},
	render: Template,
};

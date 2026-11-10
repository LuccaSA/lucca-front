import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

interface OnlyBubbleStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Only bubble',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: OnlyBubbleStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'${CDN_URL}/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
	</div>
</div>`;
}

const Template = (args: OnlyBubbleStory) => ({
	props: args,
	template: getTemplate(args),
});

export const OnlyBubble: StoryObj<OnlyBubbleStory> = {
	args: {},
	render: Template,
};

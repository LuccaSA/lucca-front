import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

interface SampleBasicStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: SampleBasicStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'${CDN_URL}/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="${CDN_URL}/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>`;
}

const Template = (args: SampleBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<SampleBasicStory> = {
	args: {},
	render: Template,
};

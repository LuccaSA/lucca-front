import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ValueFirstStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/ValueFirst',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
} as Meta;

function getTemplate(args: ValueFirstStory): string {
	return `<div class="highlightData mod-valueFirst">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg' | luSafeExternalSvg"></div>
	</div>
</div>`;
}

const Template = (args: ValueFirstStory) => ({
	props: args,
	template: getTemplate(args),
});

export const ValueFirst: StoryObj<ValueFirstStory> = {
	args: {},
	render: Template,
};

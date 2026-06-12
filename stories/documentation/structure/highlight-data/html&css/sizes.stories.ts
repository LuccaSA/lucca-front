import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface SmallStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Sizes',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
} as Meta;

function getTemplate(args: SmallStory): string {
	return `<div class="highlightData mod-S">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg' | luSafeExternalSvg"></div>
	</div>
</div>
<div class="highlightData mod-XS">
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

const Template = (args: SmallStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-100);
			}
		`,
	],
});

export const Small: StoryObj<SmallStory> = {
	args: {},
	render: Template,
};

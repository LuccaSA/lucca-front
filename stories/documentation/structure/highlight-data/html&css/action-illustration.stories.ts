import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ActionIllustrationStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/Action & illustration',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
} as Meta;

function getTemplate(args: ActionIllustrationStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
		<dd class="highlightData-content-action"><button type="button" class="button mod-outlined">Action</button></dd>
	</dl>
	<div class="highlightData-illustrations">
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<div class="highlightData-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/polaroid-male.svg' | luSafeExternalSvg"></div>
	</div>
</div>`;
}

const Template = (args: ActionIllustrationStory) => ({
	props: args,
	template: getTemplate(args),
});

export const ActionIllustration: StoryObj<ActionIllustrationStory> = {
	args: {},
	render: Template,
};

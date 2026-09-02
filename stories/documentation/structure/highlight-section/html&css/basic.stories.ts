import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BasicStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-bubbleEnd" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Créez des politiques de frais pour ces unités légales</p>
			<p class="pr-u-bodyS">Allemagne : Lucca Deutschland — Suisse : Lucca Switzerland — Royaume-Uni : Lucca UK.</p>
		</div>
	</div>
</div>`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: {},
	render: Template,
};

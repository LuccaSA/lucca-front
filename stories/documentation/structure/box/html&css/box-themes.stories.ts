import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface ThemesStory {}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Themes',
	decorators: [
		moduleMetadata({
			imports: [HttpClientModule, LuSafeExternalSvgPipe],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: ThemesStory): string {
	return `<div class="box">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
</div>
<div class="box mod-neutral">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
</div>
<div class="box mod-sunken">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
</div>
<div class="box">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
	<div class="box-illustrations">
		<div class="box-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<img alt="" class="box-illustrations-front" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg" />
	</div>
</div>
<div class="box mod-fancyLight">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
	<div class="box-illustrations">
		<div class="box-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<img alt="" class="box-illustrations-front" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg" />
	</div>
</div>
<div class="box mod-fancyDark">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
	<div class="box-illustrations">
		<div class="box-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<img alt="" class="box-illustrations-front" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg" />
	</div>
</div>`;
}

const Template = (args: ThemesStory) => ({
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

export const Themes: StoryObj<ThemesStory> = {
	args: {},
	render: Template,
};

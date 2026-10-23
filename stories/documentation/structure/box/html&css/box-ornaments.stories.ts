import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BoxOrnamentsStory {
	theme: string;
}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Ornaments',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {
		theme: {
			options: ['', 'fancyLight', 'fancyDark'],
			control: { type: 'select' },
			description: 'Les ornements ne sont disponibles que sur les thèmes <code>fancy*</code> (<code>fancyWhite</code> n’a pas de classe).',
		},
	},
} as Meta;

function getTemplate(args: BoxOrnamentsStory): string {
	const theme = args.theme ? ` mod-${args.theme}` : '';

	return `<div class="box${theme}">
	<div class="box-header">
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
	<div class="box-illustrations">
		<div class="box-illustrations-back" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"></div>
		<img alt="" class="box-illustrations-front" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/calendar.svg" />
	</div>
</div>`;
}

const Template = (args: BoxOrnamentsStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Ornaments: StoryObj<BoxOrnamentsStory> = {
	args: { theme: 'fancyLight' },
	render: Template,
};

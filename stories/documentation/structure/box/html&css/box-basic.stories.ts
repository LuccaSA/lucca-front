import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BoxBasicStory {
	theme: string;
	heading: boolean;
	description: boolean;
	bubbleIcon: boolean;
}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [BubbleIconComponent],
		}),
	],
	argTypes: {
		theme: {
			options: ['', 'neutral', 'sunken', 'fancyLight', 'fancyDark'],
			control: { type: 'select' },
			description: 'Applique un thème via la classe <code>mod-[theme]</code>. Les thèmes <code>white</code> et <code>fancyWhite</code> n’ont pas de classe.',
		},
		heading: {
			description: 'Ajoute un titre.',
		},
		description: {
			description: 'Ajoute un sous-titre.',
		},
		bubbleIcon: {
			description: 'Ajoute une icône dans une bulle avant le titre. N’importe quel élément peut prendre sa place.',
		},
	},
} as Meta;

function getTemplate(args: BoxBasicStory): string {
	const theme = args.theme ? ` mod-${args.theme}` : '';
	const description = args.description ? `\n\t\t\t<p class="box-header-subtitle">Subtitle</p>` : '';
	const bubbleIcon = args.bubbleIcon ? `\n\t\t<lu-bubble-icon icon="fileCopy" />` : '';
	const header = args.heading
		? `\n\t<div class="box-header">${bubbleIcon}
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>${description}
		</div>
	</div>`
		: '';

	return `<div class="box${theme}">${header}
	<div class="box-slot">Custom content</div>
</div>`;
}

const Template = (args: BoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BoxBasicStory> = {
	args: { theme: '', heading: true, description: false, bubbleIcon: false },
	render: Template,
};

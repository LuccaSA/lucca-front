import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BoxBasicStory {
	theme: string;
	heading: boolean;
	description: boolean;
	icon: boolean;
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
		icon: {
			description: 'Ajoute une icône dans une bulle. Indisponible sur les thèmes <code>fancy*</code>.',
		},
	},
} as Meta;

function getTemplate(args: BoxBasicStory): string {
	const theme = args.theme ? ` mod-${args.theme}` : '';
	const icon = args.icon ? `\n\t\t<lu-bubble-icon class="box-header-icon" icon="fileCopy" />` : '';
	const description = args.description ? `\n\t\t\t<p class="box-header-description">Lucca lit les formats PDF, JPG et PNG jusqu’à 5 Mo.</p>` : '';
	const header = args.heading
		? `\n\t<div class="box-header">${icon}
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Titre</div>${description}
		</div>
	</div>`
		: '';

	return `<div class="box${theme}">${header}
	Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll.
</div>`;
}

const Template = (args: BoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BoxBasicStory> = {
	args: { theme: '', heading: true, description: false, icon: false },
	render: Template,
};

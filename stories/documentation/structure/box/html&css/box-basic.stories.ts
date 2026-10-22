import { Meta, StoryObj } from '@storybook/angular-vite';

interface BoxBasicStory {
	theme: string;
	heading: boolean;
	description: boolean;
}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Basic',
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
	},
} as Meta;

function getTemplate(args: BoxBasicStory): string {
	const theme = args.theme ? ` mod-${args.theme}` : '';
	const description = args.description ? `\n\t\t<p class="box-header-description">Lucca lit les formats PDF, JPG et PNG jusqu’à 5 Mo.</p>` : '';
	const header = args.heading
		? `\n\t<div class="box-header">
		<div role="heading" aria-level="3" class="box-header-title">Titre</div>${description}
	</div>`
		: '';

	return `<div class="box${theme}">${header}
	<div class="box-slot">Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll.</div>
</div>`;
}

const Template = (args: BoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BoxBasicStory> = {
	args: { theme: '', heading: true, description: false },
	render: Template,
};

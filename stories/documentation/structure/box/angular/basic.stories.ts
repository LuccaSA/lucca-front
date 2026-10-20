import { provideHttpClient } from '@angular/common/http';
import { BOX_HX, BOX_THEME, BoxComponent, luBoxTranslations } from '@lucca-front/ng/box';
import { HIGHLIGHT_DATA_BUBBLE, HIGHLIGHT_DATA_ILLUSTRATION } from '@lucca-front/ng/highlight-data';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Box/Angular/Basic',
	argTypes: {
		theme: {
			options: setStoryOptions(BOX_THEME),
			control: { type: 'select' },
			description: 'Couleur de fond de la box. Les thèmes <code>fancy*</code> mettent la box en avant.',
			table: { category: 'inputs' },
		},
		heading: {
			type: 'string',
			description: 'Titre de la box. [PortalContent]',
			table: { category: 'inputs' },
		},
		description: {
			type: 'string',
			description: 'Sous-titre affiché sous le titre. [PortalContent]',
			table: { category: 'inputs' },
		},
		hx: {
			options: setStoryOptions(BOX_HX),
			control: { type: 'select' },
			description: 'Niveau aria du titre.',
			table: { category: 'inputs' },
		},
		icon: {
			type: 'string',
			description: 'Icône affichée dans une bulle à côté du titre. Indisponible sur les thèmes <code>fancy*</code>.',
			table: { category: 'inputs' },
		},
		bubble: {
			options: setStoryOptions(HIGHLIGHT_DATA_BUBBLE),
			control: { type: 'select' },
			description: 'Bulle décorative affichée à droite. Disponible uniquement sur les thèmes <code>fancy*</code>.',
			table: { category: 'inputs' },
		},
		illustration: {
			options: setStoryOptions(HIGHLIGHT_DATA_ILLUSTRATION),
			control: { type: 'select' },
			description: 'Illustration affichée à droite. Disponible uniquement sur les thèmes <code>fancy*</code>. Il est également possible de renseigner une URL.',
			table: { category: 'inputs' },
		},
		neutral: {
			description: '[Déprécié] Utiliser <code>theme="neutral"</code>.',
			table: { category: 'inputs' },
		},
		killable: {
			description: '[Déprécié] Ajoute un bouton de fermeture.',
			table: { category: 'inputs' },
		},
		toggle: {
			description: '[Déprécié] Applique le style « toggle » (classe <code>mod-toggle</code>).',
			table: { category: 'inputs' },
		},
		withArrow: {
			description: '[Déprécié] Ajoute une flèche pointant vers le champ placé au-dessus de la box (voir la story Arrow).',
			table: { category: 'inputs' },
		},
		killed: {
			description: '[Déprécié] Événement déclenché lorsque la box est fermée.',
			action: 'killed',
			table: { category: 'outputs', type: { summary: 'void' } },
			control: false,
		},
		intl: intlArgType(luBoxTranslations, 'LuBoxLabel'),
	},
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
	render: ({ killed, ...args }, { argTypes }) => {
		return {
			props: {
				...args,
				onKilled: () => killed?.(),
			},
			template: cleanupTemplate(`<lu-box ${generateInputs(args, argTypes)} (killed)="onKilled()">Lorem ipsum dolor sit amet</lu-box>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxComponent> = {
	args: {
		heading: 'Titre',
	},
};

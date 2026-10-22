import { provideHttpClient } from '@angular/common/http';
import { BOX_HX, BOX_SIZE, BOX_THEME, BoxComponent, luBoxTranslations } from '@lucca-front/ng/box';
import { HIGHLIGHT_DATA_BUBBLE, HIGHLIGHT_DATA_ILLUSTRATION } from '@lucca-front/ng/highlight-data';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { useArgs } from 'storybook/preview-api';
import { HiddenArgType } from '@/helpers/common-arg-types';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Box/Angular/Basic',
	argTypes: {
		theme: {
			options: setStoryOptions(BOX_THEME),
			control: { type: 'select' },
			description: 'Couleur de fond de la box. Les thèmes <code>fancy*</code> mettent la box en avant.',
			table: { category: 'inputs', defaultValue: { summary: 'white' } },
		},
		bubble: {
			name: '↳ bubble',
			if: { arg: 'fancyTheme', truthy: true },
			options: setStoryOptions(HIGHLIGHT_DATA_BUBBLE),
			control: { type: 'select' },
			description: 'Bulle décorative affichée à droite. Disponible uniquement sur les thèmes <code>fancy*</code>.',
			table: { category: 'inputs' },
		},
		illustration: {
			name: '↳ illustration',
			if: { arg: 'fancyTheme', truthy: true },
			options: setStoryOptions(HIGHLIGHT_DATA_ILLUSTRATION),
			control: { type: 'select' },
			description: 'Illustration affichée à droite. Disponible uniquement sur les thèmes <code>fancy*</code>. Il est également possible de renseigner une URL.',
			table: { category: 'inputs' },
		},
		fancyTheme: HiddenArgType,
		size: {
			options: setStoryOptions(BOX_SIZE),
			control: { type: 'select' },
			description: 'Taille de la box. La taille <code>S</code> réduit le titre, le sous-titre et l’illustration.',
			table: { category: 'inputs', defaultValue: { summary: 'M' } },
		},
		heading: {
			type: 'string',
			description: 'Titre de la box. [PortalContent]',
			table: { category: 'inputs' },
		},
		subtitle: {
			name: '↳ subtitle',
			if: { arg: 'heading', truthy: true },
			type: 'string',
			description: 'Sous-titre affiché sous le titre. [PortalContent]',
			table: { category: 'inputs' },
		},
		hx: {
			name: '↳ hx',
			if: { arg: 'heading', truthy: true },
			options: setStoryOptions(BOX_HX),
			control: { type: 'select' },
			description: 'Niveau aria du titre. 3 par défaut.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luBoxTranslations, 'LuBoxLabel'),
		neutral: {
			description: '[Déprécié] Utiliser <code>theme="neutral"</code>.',
			table: { category: 'inputs (deprecated)' },
		},
		killable: {
			description: '[Déprécié] Ajoute un bouton de fermeture.',
			table: { category: 'inputs (deprecated)' },
		},
		toggle: {
			description: '[Déprécié] Applique le style « toggle » (classe <code>mod-toggle</code>).',
			table: { category: 'inputs (deprecated)' },
		},
		withArrow: {
			description: '[Déprécié] Ajoute une flèche pointant vers le champ placé au-dessus de la box (voir la story Arrow).',
			table: { category: 'inputs (deprecated)' },
		},
		killed: {
			description: '[Déprécié] Événement déclenché lorsque la box est fermée.',
			action: 'killed',
			table: { category: 'outputs (deprecated)', type: { summary: 'void' } },
			control: false,
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
		applicationConfig({
			providers: [provideHttpClient()],
		}),
		// Storybook `if` only tests a single value: `fancyTheme` is derived from `theme` to show ornaments controls on fancy themes only
		(story, { args }) => {
			const [, updateArgs] = useArgs();
			const fancyTheme = String(args['theme'] ?? '').startsWith('fancy');
			if (args['fancyTheme'] !== fancyTheme) {
				updateArgs({ fancyTheme });
			}
			return story();
		},
	],
	render: ({ killed, fancyTheme: _fancyTheme, bubble, illustration, ...args }, { argTypes }) => {
		// Ornaments only apply to fancy themes: keep them out of the displayed code otherwise
		const inputs = String(args['theme'] ?? '').startsWith('fancy') ? { ...args, bubble, illustration } : args;
		return {
			props: {
				...inputs,
				onKilled: () => killed?.(),
			},
			// `killed` is deprecated and only emits on a killable box: don't advertise it in the displayed code otherwise
			template: cleanupTemplate(`<lu-box ${generateInputs(inputs, argTypes)}${args['killable'] ? ' (killed)="onKilled()"' : ''}>Custom content</lu-box>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxComponent & { fancyTheme: boolean }> = {
	args: {
		theme: 'white',
		bubble: 1,
		illustration: 'piggy-bank',
		fancyTheme: false,
		size: 'M',
		heading: 'Title',
		subtitle: 'Subtitle',
		neutral: false,
		killable: false,
		toggle: false,
		withArrow: false,
	},
};

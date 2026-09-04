import { setStoryOptions } from '@/helpers/stories';
import {
	FANCY_BOX_BACKGROUND_END_START,
	FANCY_BOX_BACKGROUND_START_END,
	FANCY_BOX_FOREGROUND_END_START,
	FANCY_BOX_FOREGROUND_START_END,
	FANCY_BOX_SIZE,
	FancyBoxComponent,
} from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface FancyBoxBasicStory {
	backgroundEndStart: string;
	backgroundEndStartUrl: string;
	backgroundStartEnd: string;
	backgroundStartEndUrl: string;
	foregroundStartEnd: string;
	foregroundStartEndUrl: string;
	foregroundEndStart: string;
	foregroundEndStartUrl: string;
	size: string;
	palette: string;
	content: string;
}

export default {
	title: 'Documentation/Structure/FancyBox/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FancyBoxComponent],
		}),
	],
	argTypes: {
		backgroundEndStart: {
			options: setStoryOptions(FANCY_BOX_BACKGROUND_END_START),
			control: {
				type: 'select',
			},
			description: 'Image en arrière plan du côté "fin" (droite en LTR, gauche en RTL).',
		},
		backgroundEndStartUrl: {
			control: {
				type: 'text',
			},
			description: 'URL personnalisée pour l’image en arrière plan du côté "fin", prioritaire sur le sélecteur ci-dessus.',
		},
		backgroundStartEnd: {
			options: setStoryOptions(FANCY_BOX_BACKGROUND_START_END),
			control: {
				type: 'select',
			},
			description: 'Image en arrière plan du côté "début" (gauche en LTR, droite en RTL).',
		},
		backgroundStartEndUrl: {
			control: {
				type: 'text',
			},
			description: 'URL personnalisée pour l’image en arrière plan du côté "début", prioritaire sur le sélecteur ci-dessus.',
		},
		foregroundStartEnd: {
			options: setStoryOptions(FANCY_BOX_FOREGROUND_START_END),
			control: {
				type: 'select',
			},
			description: 'Image au premier plan du côté "début" (gauche en LTR, droite en RTL).',
		},
		foregroundStartEndUrl: {
			control: {
				type: 'text',
			},
			description: 'URL personnalisée pour l’image au premier plan du côté "début", prioritaire sur le sélecteur ci-dessus.',
		},
		foregroundEndStart: {
			options: setStoryOptions(FANCY_BOX_FOREGROUND_END_START),
			control: {
				type: 'select',
			},
			description: 'Image au premier plan du côté "fin" (droite en LTR, gauche en RTL).',
		},
		foregroundEndStartUrl: {
			control: {
				type: 'text',
			},
			description: 'URL personnalisée pour l’image au premier plan du côté "fin", prioritaire sur le sélecteur ci-dessus.',
		},
		size: {
			options: setStoryOptions(FANCY_BOX_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		palette: {
			options: ['product', 'pagga', 'poplee', 'coreHR', 'timmi', 'cleemy', 'cc', 'brand'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs aux bulles de fond.',
		},
		content: {
			control: {
				type: 'text',
			},
			description: 'Contenu textuel inséré dans le composant.',
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const backgroundEndStartValue = args.backgroundEndStartUrl || (args.backgroundEndStart === 'bubbles' ? '' : args.backgroundEndStart);
	const backgroundEndStart = backgroundEndStartValue
		? `
		backgroundEndStart="${backgroundEndStartValue}"`
		: ``;
	const backgroundStartEndValue = args.backgroundStartEndUrl || (args.backgroundStartEnd === 'bubbles' ? '' : args.backgroundStartEnd);
	const backgroundStartEnd = backgroundStartEndValue
		? `
		backgroundStartEnd="${backgroundStartEndValue}"`
		: ``;
	const foregroundStartEndValue = args.foregroundStartEndUrl || args.foregroundStartEnd;
	const foregroundStartEnd = foregroundStartEndValue
		? `
		foregroundStartEnd="${foregroundStartEndValue}"`
		: ``;
	const foregroundEndStartValue = args.foregroundEndStartUrl || args.foregroundEndStart;
	const foregroundEndStart = foregroundEndStartValue
		? `
		foregroundEndStart="${foregroundEndStartValue}"`
		: ``;
	const sizeAttr = args.size === 'S' ? ` size="S"` : ``;
	const paletteAttr = args.palette && args.palette !== 'product' ? ` palette="${args.palette}"` : ``;

	return `
	<lu-fancy-box${sizeAttr}${paletteAttr}${backgroundEndStart}${backgroundStartEnd}${foregroundStartEnd}${foregroundEndStart}>
		${args.content}
	</lu-fancy-box>
	`;
}

const Template = (args: FancyBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: block;
				padding-block: var(--pr-t-spacings-400);
			}
		`,
	],
});

export const Basic: StoryObj<FancyBoxBasicStory> = {
	args: {
		backgroundEndStart: 'plant',
		backgroundStartEnd: 'candies',
		foregroundStartEnd: 'pizza',
		foregroundEndStart: 'clips',
		foregroundStartEndUrl: '',
		backgroundEndStartUrl: '',
		backgroundStartEndUrl: '',
		foregroundEndStartUrl: '',
		palette: 'product',
		content: 'Content<br />Content<br />Content<br />Content<br />Content<br />Content',
	},
	render: Template,
};

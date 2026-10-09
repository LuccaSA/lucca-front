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
	backgroundStartEnd: string;
	foregroundStartEnd: string;
	foregroundEndStart: string;
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
			description: 'Image en arrière plan, en bas du côté "début" (gauche en LTR, droite en RTL). Accepte aussi une URL pour une illustration personnalisée.',
			table: { category: 'inputs' },
		},
		backgroundStartEnd: {
			options: setStoryOptions(FANCY_BOX_BACKGROUND_START_END),
			control: {
				type: 'select',
			},
			description: 'Image en arrière plan, en haut du côté "fin" (droite en LTR, gauche en RTL). Accepte aussi une URL pour une illustration personnalisée.',
			table: { category: 'inputs' },
		},
		foregroundStartEnd: {
			options: setStoryOptions(FANCY_BOX_FOREGROUND_START_END),
			control: {
				type: 'select',
			},
			description: 'Image au premier plan, en haut du côté "fin" (droite en LTR, gauche en RTL). Accepte aussi une URL pour une illustration personnalisée.',
			table: { category: 'inputs' },
		},
		foregroundEndStart: {
			options: setStoryOptions(FANCY_BOX_FOREGROUND_END_START),
			control: {
				type: 'select',
			},
			description: 'Image au premier plan, en bas du côté "début" (gauche en LTR, droite en RTL). Accepte aussi une URL pour une illustration personnalisée.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(FANCY_BOX_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		palette: {
			options: ['product', 'pagga', 'poplee', 'coreHR', 'timmi', 'cleemy', 'cc', 'brand'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs aux bulles de fond.',
			table: { category: 'inputs' },
		},
		content: {
			control: {
				type: 'text',
			},
			description: 'Contenu textuel inséré dans le composant.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const backgroundEndStartValue = args.backgroundEndStart === 'bubbles' ? '' : args.backgroundEndStart;
	const backgroundEndStart = backgroundEndStartValue
		? `
		backgroundEndStart="${backgroundEndStartValue}"`
		: ``;
	const backgroundStartEndValue = args.backgroundStartEnd === 'bubbles' ? '' : args.backgroundStartEnd;
	const backgroundStartEnd = backgroundStartEndValue
		? `
		backgroundStartEnd="${backgroundStartEndValue}"`
		: ``;
	const foregroundStartEnd = args.foregroundStartEnd
		? `
		foregroundStartEnd="${args.foregroundStartEnd}"`
		: ``;
	const foregroundEndStart = args.foregroundEndStart
		? `
		foregroundEndStart="${args.foregroundEndStart}"`
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
		palette: 'product',
		content: 'Content<br />Content<br />Content<br />Content<br />Content<br />Content',
	},
	render: Template,
};

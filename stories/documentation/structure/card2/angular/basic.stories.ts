import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CARD_HEADING_LEVEL, CARD_SIZE, CardActionDirective, CardComponent, CardWrapperComponent } from '@lucca-front/ng/card';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { IconsList } from '@/stories/icons-list';

interface CardArgs {
	heading: string;
	content: string;
	action: 'link' | 'button';
	disabled: boolean;
}

interface CardBasicStory extends CardArgs {
	headingLevel: number;
	size: string;
	bubbleIcon: string;
	richContent: boolean;
	wrapper: boolean;
	grid: boolean;
	plain: boolean;
	cards: number;
	wrapperHeadingLevel: number;
	wrapperSize: string;
	wrapperAction: boolean;
}

const defaultCardArgs: CardArgs = { heading: 'Title', content: 'Card content', action: 'link', disabled: false };

export default {
	title: 'Documentation/Structure/Card2/Angular/Basic',
	argTypes: {
		heading: {
			description: 'Texte du lien ou du bouton `luCardAction`, qui sert de titre à la carte. Obligatoire.',
			control: {
				type: 'text',
			},
		},
		content: {
			description:
				'Contenu projeté dans la carte, sous le titre. Facultatif : un contenu conditionnel doit être entouré d’un `@if` (`@if (description) { {{ description }} }`), car une interpolation vide compte comme du contenu et laisse l’espace sous le titre.',
			control: {
				type: 'text',
			},
		},
		action: {
			description: 'Élément portant `luCardAction`.',
			options: ['link', 'button'],
			control: {
				type: 'select',
			},
		},
		headingLevel: {
			description: 'Niveau de titre de la carte.',
			options: CARD_HEADING_LEVEL,
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper', truthy: false },
			table: { category: 'inputs', defaultValue: { summary: '3' } },
		},
		size: {
			description: 'Taille de la carte.',
			options: ['M', ...CARD_SIZE],
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper', truthy: false },
			table: { category: 'inputs', defaultValue: { summary: 'M' } },
		},
		disabled: {
			description: 'Désactive l’action : retire le `href` du lien, ou ajoute l’attribut natif `disabled` au bouton.',
		},
		bubbleIcon: {
			options: setStoryOptions(IconsList.filter((i) => !i.deprecated).map((i) => i.icon)),
			control: { type: 'select' },
			description: 'Icône décorative affichée dans une bulle avant le titre. Pour un autre contenu, projeter un élément portant l’attribut `cardHeaderStartSlot`.',
			if: { arg: 'richContent', truthy: false },
			table: { category: 'inputs' },
		},
		wrapper: {
			description: 'Place plusieurs cartes dans un `lu-card-wrapper`.',
			table: { category: 'lu-card-wrapper' },
		},
		cards: {
			name: '↳ cards',
			description: 'Nombre de cartes dans le `lu-card-wrapper`.',
			control: {
				type: 'range',
				min: 0,
				max: 10,
				step: 1,
			},
			if: { arg: 'wrapper' },
			table: { category: 'lu-card-wrapper' },
		},
		grid: {
			name: '↳ grid',
			description: 'Affiche les cartes en colonnes au lieu de les empiler.',
			if: { arg: 'wrapper' },
			table: { category: 'lu-card-wrapper' },
		},
		plain: {
			name: '↳ plain',
			description: 'Retire le fond et le padding autour des cartes.',
			if: { arg: 'wrapper' },
			table: { category: 'lu-card-wrapper' },
		},
		wrapperHeadingLevel: {
			name: '↳ headingLevel',
			description: 'Niveau de titre de toutes les cartes, prioritaire sur celui de chaque carte.',
			options: CARD_HEADING_LEVEL,
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper' },
			table: { category: 'lu-card-wrapper' },
		},
		wrapperSize: {
			name: '↳ size',
			description: 'Taille de toutes les cartes, prioritaire sur celle de chaque carte.',
			options: ['M', ...CARD_SIZE],
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper' },
			table: { category: 'lu-card-wrapper' },
		},
		wrapperAction: {
			name: '↳ action',
			description: 'Ajoute un bouton portant `cardWrapperAction` après les cartes.',
			if: { arg: 'wrapper' },
			table: { category: 'lu-card-wrapper' },
		},
		richContent: {
			description: 'Remplace l’input `bubbleIcon` par un contenu projeté avec l’attribut `cardHeaderStartSlot` : une bulle avec une autre direction, ou un autre visuel.',
			table: { category: 'story' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CardComponent, CardActionDirective, CardWrapperComponent, BubbleIconComponent, ButtonComponent],
		}),
	],
	render: ({ headingLevel, size, bubbleIcon, richContent, wrapper, grid, plain, cards, wrapperHeadingLevel, wrapperSize, wrapperAction, ...cardArgs }: CardBasicStory, { argTypes }) => {
		const cardInputs = wrapper ? '' : generateInputs({ headingLevel: `${headingLevel}`, size }, argTypes);
		const getCardTemplate = ({ heading, content, action, disabled }: CardArgs) => {
			const bubbleIconAttr = !richContent && bubbleIcon ? ` bubbleIcon="${bubbleIcon}"` : '';
			const headerStartTemplate = richContent
				? `
	<lu-bubble-icon cardHeaderStartSlot icon="app" bubbleDirection="left" />`
				: '';
			const hrefAttr = disabled ? '' : ' href="#"';
			const disabledAttr = disabled ? ' disabled' : '';
			const actionTemplate = action === 'button' ? `<button type="button" luCardAction${disabledAttr}>${heading}</button>` : `<a${hrefAttr} luCardAction>${heading}</a>`;
			const contentTemplate = content
				? `
	${content}`
				: '';
			return `<lu-card${cardInputs}${bubbleIconAttr}>${headerStartTemplate}
	${actionTemplate}${contentTemplate}
</lu-card>`;
		};
		const gridAttr = grid ? ' grid' : '';
		const plainAttr = plain ? ' plain' : '';
		// The defaults (level 3, size M) render like a wrapper without these inputs
		const wrapperHeadingLevelAttr = wrapperHeadingLevel !== 3 ? ` headingLevel="${wrapperHeadingLevel}"` : '';
		const wrapperSizeAttr = wrapperSize !== 'M' ? ` size="${wrapperSize}"` : '';
		const wrapperActionTemplate = wrapperAction
			? `
    <button type="button" luButton cardWrapperAction>Button</button>`
			: '';
		return {
			template: wrapper
				? `<lu-card-wrapper${gridAttr}${plainAttr}${wrapperHeadingLevelAttr}${wrapperSizeAttr}>
${Array.from({ length: cards }, (_, index) => getCardTemplate(index === 0 ? cardArgs : defaultCardArgs))
	.map((card) => card.replace(/^/gm, '    '))
	.join('\n')}${wrapperActionTemplate}
</lu-card-wrapper>`
				: getCardTemplate(cardArgs),
		};
	},
} as Meta;

export const Basic = {
	args: {
		...defaultCardArgs,
		headingLevel: 3,
		size: 'M',
		bubbleIcon: '',
		wrapper: false,
		cards: 3,
		grid: false,
		plain: false,
		wrapperHeadingLevel: 3,
		wrapperSize: 'M',
		wrapperAction: false,
		richContent: false,
	},
};

import { IconsList } from '@/stories/icons-list';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { PaletteAllArgType } from '@/helpers/common-arg-types';
import { generateInputs } from '@/helpers/stories';

interface ListingBasicStory {
	checklist: boolean;
	ordered: boolean;
	orderedFancy: boolean;
	icons: boolean;
	type: string;
	palette: string;
	defaultIcon: string;
	icon: string;
	start: number;
	reversed: boolean;
}

export default {
	title: 'Documentation/Listings/Listing/Angular/Basic',
	component: ListingComponent,

	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],

	render: (args: ListingBasicStory, context) => {
		const { type, checklist, ordered, orderedFancy, icons, defaultIcon, icon, start, reversed, palette, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ` checklist` : ``;
		const orderedParam = args.type === 'ordered' ? ` ordered` : ``;
		const orderedFancyParam = args.type === 'orderedFancy' ? ` orderedFancy` : ``;
		const iconsParam = args.type === 'icons' ? ` icons` : ``;
		const iconParam = args.type === 'icons' ? ` icon="${args.icon}"` : ``;
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : ``;
		const startParam = args.start !== 1 && args.start !== undefined ? ` start="${start}"` : ``;
		const reversedParam = args.reversed ? ` reversed` : ``;
		const paletteParam = args.palette !== 'none' ? ` palette="${palette}"` : ``;
		return {
			template: `<lu-listing${checklistParam}${orderedParam}${orderedFancyParam}${startParam}${reversedParam}${iconsParam}${defaultIconParam}${paletteParam}${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item${iconParam}>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing${checklistParam}${orderedParam}${orderedFancyParam}${startParam}${reversedParam}${iconsParam}${defaultIconParam}${paletteParam}${generateInputs(inputs, context.argTypes)}>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item critical>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
</lu-listing>`,
		};
	},
} as Meta;

export const Template: StoryObj<ListingComponent & ListingItemComponent & { type: string }> = {
	argTypes: {
		type: {
			options: ['', 'checklist', 'ordered', 'orderedFancy', 'icons'],
			control: {
				type: 'select',
			},
			description:
				'[Story] Modifie le type de liste en activant l’input booléen correspondant : <code>checklist</code>, <code>ordered</code>, <code>orderedFancy</code> ou <code>icons</code>.<br>[v21.2] <code>orderedFancy</code>',
			table: { category: 'story' },
		},
		defaultIcon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Modifie l’icône par défaut.',
			if: { arg: 'type', eq: 'icons' },
			table: { category: 'inputs', defaultValue: { summary: 'signConfirm' } },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Modifie l’icône d’un élément de la liste.',
			if: { arg: 'type', eq: 'icons' },
			table: { category: 'inputs' },
		},
		start: {
			if: { arg: 'type', eq: 'ordered' },
			description: 'Modifie la valeur initiale de la liste.',
			table: { category: 'inputs', defaultValue: { summary: '1' } },
		},
		reversed: {
			if: { arg: 'type', eq: 'ordered' },
			description: 'Présente la liste sous forme décroissante.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		checklist: {
			control: false,
			description: 'Présente la liste sous forme de checklist (piloté par le contrôle <code>type</code>).',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		ordered: {
			control: false,
			description: 'Présente la liste sous forme ordonnée (piloté par le contrôle <code>type</code>).',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		orderedFancy: {
			control: false,
			description: '[v21.2] Présente la liste sous forme ordonnée stylisée (piloté par le contrôle <code>type</code>).',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		icons: {
			control: false,
			description: 'Présente la liste avec des icônes (piloté par le contrôle <code>type</code>).',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		palette: { ...PaletteAllArgType, table: { category: 'inputs', defaultValue: { summary: 'none' } } },
		critical: {
			control: false,
			description: 'Applique le style critique à un élément de la liste.',
			table: { category: 'inputs (listing-item)', defaultValue: { summary: 'false' } },
		},
	},

	args: {
		type: '',
		palette: 'none',
		defaultIcon: 'heart',
		icon: 'foodCroissant',
		start: 1,
		reversed: false,
	},
};

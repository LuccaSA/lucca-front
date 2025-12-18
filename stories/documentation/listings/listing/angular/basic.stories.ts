import { ɵIconsList } from '@lucca-front/icons';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

interface ListingBasicStory {
	checklist: boolean;
	ordered: boolean;
	icons: boolean;
	type: string;
	palette: string;
	defaultIcon: string;
	icon: string;
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
		const { type, checklist, ordered, icons, defaultIcon, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ' checklist' : '';
		const orderedParam = args.type === 'ordered' ? ' ordered' : '';
		const iconsParam = args.type === 'icons' ? ' icons' : '';
		const iconParam = args.type === 'icons' ? ` icon="${args.icon}"` : '';
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : '';
		return {
			template: cleanupTemplate(`<lu-listing${checklistParam}${orderedParam}${iconsParam}${defaultIconParam} ${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item${iconParam}>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing${checklistParam}${orderedParam}${iconsParam}${defaultIconParam} ${generateInputs(inputs, context.argTypes)}>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
</lu-listing>`),
		};
	},
} as Meta;

export const Template: StoryObj<ListingComponent & ListingItemComponent & { type: string }> = {
	argTypes: {
		type: {
			options: ['', 'checklist', 'ordered', 'icons'],
			control: {
				type: 'select',
			},
			description: 'Modifie le type de liste (ordonnée, checklist, icônes, etc.)',
		},
		defaultIcon: {
			options: ɵIconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: "Modifie l'icône par défaut de chaque élément lorsque le type <code>icons</code> est sélectionné.",
		},
		icon: {
			options: ɵIconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: "Modifie l'icône par défaut d'un élément lorsque le type <code>icons</code> est sélectionné.",
		},
		palette: PaletteAllArgType,
	},

	args: {
		type: '',
		palette: 'none',
		defaultIcon: 'heart',
		icon: 'foodCroissant',
	},
};

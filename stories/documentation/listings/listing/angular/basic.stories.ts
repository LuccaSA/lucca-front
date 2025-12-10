import { IconsList } from '@lucca-front/icons/icons-list';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

interface ListingBasicStory {
	checklist: boolean;
	ordered: boolean;
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
		const { type, checklist, ordered, icons, defaultIcon, icon, start, reversed, palette, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ` checklist` : ``;
		const orderedParam = args.type === 'ordered' ? ` ordered` : ``;
		const iconsParam = args.type === 'icons' ? ` icons` : ``;
		const iconParam = args.type === 'icons' ? ` icon="${args.icon}"` : ``;
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : ``;
		const startParam = args.start !== 1 && args.start !== undefined ? ` start="${start}"` : ``;
		const reversedParam = args.reversed ? ` reversed` : ``;
		const paletteParam = args.palette !== 'none' ? ` palette="${palette}"` : ``;
		return {
			template: `<lu-listing${checklistParam}${orderedParam}${startParam}${reversedParam}${iconsParam}${defaultIconParam}${paletteParam}${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item${iconParam}>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing${checklistParam}${orderedParam}${startParam}${iconsParam}${defaultIconParam}${paletteParam}${generateInputs(inputs, context.argTypes)}>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
</lu-listing>`,
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
		},
		defaultIcon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			if: { arg: 'type', eq: 'icons' },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			if: { arg: 'type', eq: 'icons' },
		},
		start: {
			if: { arg: 'type', eq: 'ordered' },
		},
		reversed: {
			if: { arg: 'type', eq: 'ordered' },
		},
		checklist: HiddenArgType,
		icons: HiddenArgType,
		ordered: HiddenArgType,
		palette: {
			PaletteAllArgType,
			if: { arg: 'type', truthy: true },
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

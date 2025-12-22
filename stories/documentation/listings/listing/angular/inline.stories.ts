import { IconsList } from '@/stories/icons-list';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

interface ListingBasicStory {
	checklist: boolean;
	icons: boolean;
	type: string;
	palette: string;
	defaultIcon: string;
	icon: string;
}

export default {
	title: 'Documentation/Listings/Listing/Angular/Inline',
	component: ListingComponent,

	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],

	render: (args: ListingBasicStory, context) => {
		const { type, checklist, icons, defaultIcon, icon, palette, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ` checklist` : ``;
		const iconsParam = args.type === 'icons' ? ` icons` : ``;
		const iconParam = args.type === 'icons' ? ` icon="${args.icon}"` : ``;
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : ``;
		const paletteParam = args.palette !== 'none' ? ` palette="${palette}"` : ``;
		return {
			template: `<lu-listing inline${checklistParam}${iconsParam}${defaultIconParam}${paletteParam}${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item>Lorem ipsum</lu-listing-item>
	<lu-listing-item${iconParam}>Lorem ipsum dolor sit amet</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor sit</lu-listing-item>
	<lu-listing-item>Lorem</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor sit amet</lu-listing-item>
</lu-listing>`,
		};
	},
} as Meta;

export const Template: StoryObj<ListingComponent & ListingItemComponent & { type: string }> = {
	argTypes: {
		type: {
			options: ['', 'checklist', 'icons'],
			control: {
				type: 'select',
			},
		},

		checklist: HiddenArgType,
		icons: HiddenArgType,
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
		palette: {
			PaletteAllArgType,
			if: { arg: 'type', truthy: true },
		},
	},

	args: {
		type: '',
		divider: false,
		palette: 'none',
		defaultIcon: 'heart',
		icon: 'foodCroissant',
	},
};

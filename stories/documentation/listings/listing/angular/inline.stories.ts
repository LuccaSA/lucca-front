import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

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
	title: 'Documentation/Listings/Listing/Angular/Inline',
	component: ListingComponent,

	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],

	render: (args: ListingBasicStory, context) => {
		const { type, checklist, ordered, icons, defaultIcon, icon, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ' checklist' : '';
		const orderedParam = args.type === 'ordered' ? ' ordered' : '';
		const iconsParam = args.type === 'icons' ? ' icons' : '';
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : '';
		return {
			template: `<lu-listing marker="–" inline${checklistParam}${orderedParam}${iconsParam}${defaultIconParam}${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
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

		checklist: HiddenArgType,
		icons: HiddenArgType,
		ordered: HiddenArgType,
		palette: HiddenArgType,
		defaultIcon: HiddenArgType,
	},

	args: {
		type: '',
		defaultIcon: 'heart',
		hideFirstItems: false,
		marker: '',
	},
};

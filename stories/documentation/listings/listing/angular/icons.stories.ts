import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingIconsStory {}

export default {
	title: 'Documentation/Listings/Listing/Angular/Icons',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],
	render: (args: ListingIconsStory) => {
		return {
			template: cleanupTemplate(`<lu-listing icons>
	<lu-listing-item icon="foodCroissant">item</lu-listing-item>
	<lu-listing-item icon="foodBurger">item</lu-listing-item>
	<lu-listing-item icon="foodCoffee">
		item
		<lu-listing palette="product" icons defaultIcon="foodBirthdayCake" >
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
</lu-listing>`),
		};
	},
} as Meta;

export const Basic = {};

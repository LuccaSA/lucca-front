import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingOrderedStory {}

export default {
	title: 'Documentation/Listing/Listing/Angular/Ordrered',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],
	render: (args: ListingOrderedStory) => {
		return {
			template: cleanupTemplate(`
<lu-listing ordered>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing ordered>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
</lu-listing>
`),
		};
	},
} as Meta;

export const Basic = {};

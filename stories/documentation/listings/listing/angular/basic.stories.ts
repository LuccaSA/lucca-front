import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingBasicStory {}

export default {
	title: 'Documentation/Listing/Listing/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],
	render: (args: ListingBasicStory) => {
		return {
			template: cleanupTemplate(`
<lu-listing>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing>
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

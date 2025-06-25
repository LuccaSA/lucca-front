import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingChecklistStory {}

export default {
	title: 'Documentation/Listing/Listing/Angular/Checklist',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent],
		}),
	],
	render: (args: ListingChecklistStory) => {
		return {
			template: cleanupTemplate(`
<lu-listing checklist>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing checklist palette="success">
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

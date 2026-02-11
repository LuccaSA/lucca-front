import { Meta } from '@storybook/angular';

interface ListingOrderedStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Ordered',
	argTypes: {},
	render: (args: ListingOrderedStory) => {
		return {
			template: `<ol class="listing">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ol class="listing">
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
			</ol>
		</div>
	</li>
</ol>`,
		};
	},
} as Meta;

export const Basic = {};

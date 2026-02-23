import { Meta } from '@storybook/angular';

interface ListingOrderedFancyStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Ordered fancy',
	argTypes: {},
	render: (args: ListingOrderedFancyStory) => {
		return {
			template: `<ol class="listing mod-fancy">
	<li class="listing-item">
		<div class="listing-item-number" aria-hidden="true"></div>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-number" aria-hidden="true"></div>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-number" aria-hidden="true"></div>
		<div class="listing-item-content">
			item
			<ol class="listing mod-fancy">
				<li class="listing-item">
					<div class="listing-item-number" aria-hidden="true"></div>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-number" aria-hidden="true"></div>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-number" aria-hidden="true"></div>
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

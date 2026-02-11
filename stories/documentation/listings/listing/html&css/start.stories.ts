import { Meta } from '@storybook/angular';

interface ListingReversedStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Start',
	argTypes: {},
	render: (args: ListingReversedStory) => {
		return {
			template: `<ol class="listing" start="3">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ol class="listing" start="3">
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

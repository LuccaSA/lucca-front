import { Meta } from '@storybook/angular';

interface ListingReversedStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Reversed',
	argTypes: {},
	render: (args: ListingReversedStory) => {
		return {
			template: `<ol class="listing" reversed="reversed">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ol class="listing" reversed="reversed">
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

import { Meta } from '@storybook/angular';

interface ListingDividerStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Divider',
	argTypes: {},
	render: (args: ListingDividerStory) => {
		return {
			template: `<ul class="listing mod-inline mod-divider">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
</ul>`,
		};
	},
} as Meta;

export const Basic = {};

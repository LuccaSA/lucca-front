import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingDividerStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Divider',
	argTypes: {},
	render: (args: ListingDividerStory) => {
		return {
			template: cleanupTemplate(`<ul class="listing mod-inline mod-divider">
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
</ul>`),
		};
	},
} as Meta;

export const Basic = {};

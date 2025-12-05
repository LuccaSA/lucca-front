import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingInlineStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Inline',
	argTypes: {},
	render: (args: ListingInlineStory) => {
		return {
			template: cleanupTemplate(`<ul class="listing mod-inline">
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

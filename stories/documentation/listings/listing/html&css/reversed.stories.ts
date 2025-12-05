import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingReversedStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Reversed',
	argTypes: {},
	render: (args: ListingReversedStory) => {
		return {
			template: cleanupTemplate(`<ol class="listing" reversed start="3">
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
</ol>`),
		};
	},
} as Meta;

export const Basic = {};

import { Meta } from '@storybook/angular';

interface ListingBasicStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Basic',
	argTypes: {},
	render: (args: ListingBasicStory) => {
		return {
			template: `<ul class="listing">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ul class="listing">
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
			</ul>
		</div>
	</li>
</ul>`,
		};
	},
} as Meta;

export const Basic = {};

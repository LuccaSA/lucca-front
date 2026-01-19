import { Meta } from '@storybook/angular';

interface ListingChecklistStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Checklist',
	argTypes: {},
	render: (args: ListingChecklistStory) => {
		return {
			template: `<ul class="listing mod-checklist">
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
		</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
		</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
			<ul class="listing mod-checklist palette-success">
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">
						item
					</div>
				</li>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">
						item
					</div>
				</li>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">
						item
					</div>
				</li>
			</ul>
		</div>
	</li>
</ul>`,
		};
	},
} as Meta;

export const Basic = {};

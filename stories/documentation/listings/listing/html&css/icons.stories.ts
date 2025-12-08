import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingIconsStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Icons',
	argTypes: {},
	render: (args: ListingIconsStory) => {
		return {
			template: cleanupTemplate(`<ul class="listing mod-icons">
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon icon-foodCroissant" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
		</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon icon-foodBurger" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
		</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon icon-foodCoffee" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
			<ul class="listing palette-product mod-icons" style="--components-listing-item-icon-before-content: ''">
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
</ul>`),
		};
	},
} as Meta;

export const Basic = {};

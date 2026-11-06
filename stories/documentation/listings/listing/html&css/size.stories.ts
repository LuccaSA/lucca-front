import { Meta } from '@storybook/angular-vite';

interface ListingSizeStory {}

export default {
	title: 'Documentation/Listings/Listing/HTML&CSS/Size',
	argTypes: {},
	render: (args: ListingSizeStory) => {
		return {
			template: `<ul class="listing mod-S">
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

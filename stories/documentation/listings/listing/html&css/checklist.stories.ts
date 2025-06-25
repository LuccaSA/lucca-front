import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingChecklistStory {}

export default {
	title: 'Documentation/Listing/Listing/HTML&CSS/Checklist',
	argTypes: {},
	render: (args: ListingChecklistStory) => {
		return {
			template: cleanupTemplate(`
<ul class="listing mod-checklist">
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
</ul>
`),
		};
	},
} as Meta;

export const Basic = {};

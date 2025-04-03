import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ListingBasicStory {}

export default {
	title: 'Documentation/Listing/Listing/HTML&CSS/Basic',
	argTypes: {},
	render: (args: ListingBasicStory) => {
		return {
			template: cleanupTemplate(`
<ul class="listing">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ul>
<hr class="divider" />
<ol class="listing">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ol>
<hr class="divider" />
<ul class="listing mod-checklist">
	<li class="listing-item">
			<div class="listing-item-icon"></div>
			item
	</li>
	<li class="listing-item">
			<div class="listing-item-icon"></div>
			item
	</li>
	<li class="listing-item">
			<div class="listing-item-icon"></div>
			item
	</li>
</ul>
`),
		};
	},
} as Meta;

export const Basic = {};

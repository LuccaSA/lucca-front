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
	<li class="listing-item">item
				<ul class="listing">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ul>
	</li>
</ul>
<hr class="divider" />
<ol class="listing">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">
		item
		<ol class="listing">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ol>
		</li>
</ol>
<hr class="divider" />
<ol class="listing" start="10">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ol>
<hr class="divider" />
<ol class="listing" start="100">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ol>
<hr class="divider" />
<ol class="listing" start="1000">
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
	<li class="listing-item">item</li>
</ol>
<hr class="divider" />
<ul class="listing mod-icons palette-success">
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon icon-signConfirm mod-S" aria-hidden="true"></span>
			<div>
			item
			</div>
	</li>
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon icon-signConfirm mod-S" aria-hidden="true"></span>
			<div>
			item
			</div>
	</li>
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon icon-signConfirm mod-S" aria-hidden="true"></span>
			<div>
			item
			<ul class="listing mod-icons palette-success">
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon icon-signConfirm mod-S" aria-hidden="true"></span>
			<div>
			item
			</div>
	</li>
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon icon-signConfirm mod-S" aria-hidden="true"></span>
			<div>
			item
			</div>
	</li>
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon icon-signConfirm mod-S" aria-hidden="true"></span>
			<div>
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

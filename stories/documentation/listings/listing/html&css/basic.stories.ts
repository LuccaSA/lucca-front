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
	<li class="listing-item">
		item
		<ul class="listing">
			<li class="listing-item">item</li>
			<li class="listing-item">item</li>
			<li class="listing-item">
				item
				<ul class="listing">
					<li class="listing-item">item</li>
					<li class="listing-item">item</li>
					<li class="listing-item">item</li>
				</ul>
			</li>
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
			<li class="listing-item">
				item
				<ol class="listing">
					<li class="listing-item">item</li>
					<li class="listing-item">item</li>
					<li class="listing-item">item</li>
				</ol>
			</li>
		</ol>
	</li>
</ol>
<hr class="divider" />
<ul class="listing mod-checklist palette-success">
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
			<div class="listing-item-content">
				item
			</div>
	</li>
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
			<div class="listing-item-content">
				item
			</div>
	</li>
	<li class="listing-item">
			<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
			<div class="listing-item-content">
				item
				<ul class="listing mod-checklist">
					<li class="listing-item">
							<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
							<div class="listing-item-content">
								item
							</div>
					</li>
					<li class="listing-item">
							<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
							<div class="listing-item-content">
								item
							</div>
					</li>
					<li class="listing-item">
						<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
						<div class="listing-item-content">
							item
							<ul class="listing mod-icons">
								<li class="listing-item">
										<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
										<div class="listing-item-content">
											item
										</div>
								</li>
								<li class="listing-item">
										<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
										<div class="listing-item-content">
											item
										</div>
								</li>
								<li class="listing-item">
										<span class="listing-item-icon lucca-icon mod-S" aria-hidden="true"></span>
										<div class="listing-item-content">
											item
										</div>
								</li>
							</ul>
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

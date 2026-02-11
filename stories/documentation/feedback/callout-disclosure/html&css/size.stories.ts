import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/HTML&CSS',
	render: () => {
		return {
			template: `<details class="calloutDisclosure mod-S">
  <summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signInfo"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
		<ul class="calloutFeedbackList">
	  	<li class="calloutFeedbackList-item">
				<p class="calloutFeedbackList-item-description">Feedback description.</p>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-ghost">Button</button>
				</div>
			</li>
			<li class="calloutFeedbackList-item">
				<p class="calloutFeedbackList-item-description">Feedback description.</p>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-ghost">Button</button>
				</div>
			</li>
		</ul>
	</div>
</details>`,
		};
	},
} as Meta;

export const Size: StoryObj = {};

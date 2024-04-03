import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Disclosure/HTML&CSS',
	render: () => {
		return {
			styles: [
				`
				.calloutDisclosure {
					margin-bottom: var(--pr-t-spacings-100);
				}
			`,
			],
			template: `<details class="calloutDisclosure palette-success">
  <summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signSuccess"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
		<ul class="calloutFeedbackList palette-neutral">
	  	<li class="calloutFeedbackList-item">
				<span class="calloutFeedbackList-item-description">Feedback description.</span>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-text">Button</button>
				</div>
			</li>
			<li class="calloutFeedbackList-item">
				<span class="calloutFeedbackList-item-description">Feedback description.</span>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-text">Button</button>
				</div>
			</li>
		</ul>
	</div>
</details>

<details class="calloutDisclosure palette-warning">
  <summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signWarning"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
		<ul class="calloutFeedbackList palette-neutral">
	  	<li class="calloutFeedbackList-item">
				<span class="calloutFeedbackList-item-description">Feedback description.</span>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-text">Button</button>
				</div>
			</li>
			<li class="calloutFeedbackList-item">
				<span class="calloutFeedbackList-item-description">Feedback description.</span>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-text">Button</button>
				</div>
			</li>
		</ul>
	</div>
</details>

<details class="calloutDisclosure palette-error">
  <summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signError"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
		<ul class="calloutFeedbackList palette-neutral">
	  	<li class="calloutFeedbackList-item">
				<span class="calloutFeedbackList-item-description">Feedback description.</span>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-text">Button</button>
				</div>
			</li>
			<li class="calloutFeedbackList-item">
				<span class="calloutFeedbackList-item-description">Feedback description.</span>
				<div class="calloutFeedbackList-item-actions">
					<a href class="button mod-outlined">Button</a>
					<button type="button" class="button mod-text">Button</button>
				</div>
			</li>
		</ul>
	</div>
</details>`,
		};
	},
} as Meta;

export const Status: StoryObj = {};

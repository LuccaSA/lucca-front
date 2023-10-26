import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Feedback List/HTML&CSS',
	render: () => {
		return {
			template: `<ul class="calloutFeedbackList mod-S">
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
</ul>`
		}
	}
} as Meta;

export const Size: StoryObj = {};

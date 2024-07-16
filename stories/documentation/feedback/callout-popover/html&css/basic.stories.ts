import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Popover/HTML&CSS',
	render: () => {
		return {
			styles: [
				`
				:host {
					display: flex;
					flex-direction: column;
					align-items: start;
					gap: var(--pr-t-spacings-50);
				}
			`,
			],
			template: `<button type="button" class="calloutPopover"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>1</button>
<div class="lu-popover-content calloutPopover-overlay">
  <div class="calloutPopover-overlay-head">
    <span aria-hidden="true" class="calloutPopover-overlay-head-icon lucca-icon icon-signInfo"></span>
    <span class="u-mask">Information</span>
    <strong class="calloutPopover-overlay-head-title">
      Titre
    </strong>
  </div>
  <div class="calloutPopover-overlay-content">
    <ul class="calloutFeedbackList">
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
</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {};

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
					align-items: flex-start;
					gap: var(--pr-t-spacings-50);
				}
			`,
			],
			template: `<button type="button" class="calloutPopover palette-cleemy"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-soundMegaphone"></span>Lorem</button>
<div class="lu-popover-content calloutPopover-overlay palette-cleemy">
	<div class="pr-u-flexShrink0">
		<span aria-hidden="true" class="calloutPopover-overlay-icon lucca-icon icon-soundMegaphone"></span>
	</div>
	<div class="pr-u-flexGrow1">
		<div class="calloutPopover-overlay-content">
			Ipsum dolor
		</div>
	</div>
</div>`,
		};
	},
} as Meta;

export const Custom: StoryObj = {};

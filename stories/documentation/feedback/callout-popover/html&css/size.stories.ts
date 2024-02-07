import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Popover/HTML&CSS',
	render: () => {
		return {
			styles: [`
				:host {
					display: inline-flex;
					align-items: center;
					gap: var(--pr-t-spacings-XXXS);
				}
			`],
			template: `<button type="button" class="calloutPopover mod-S"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>1</button>
<button type="button" class="calloutPopover mod-XS"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>1</button>`
		}
	}
} as Meta;

export const Size: StoryObj = {};

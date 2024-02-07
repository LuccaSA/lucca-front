import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Popover/HTML&CSS',
	render: () => {
		return {
			styles: [`
				.calloutPopover {
					margin-right: var(--pr-t-spacings-XXXS);
				}
			`],
			template: `	<button type="button" class="calloutPopover palette-success"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signSuccess"></span>1</button>
<button type="button" class="calloutPopover palette-warning"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signWarning"></span>1</button>
<button type="button" class="calloutPopover palette-error"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signError"></span>1</button>`
		}
	}
} as Meta;

export const Status: StoryObj = {};

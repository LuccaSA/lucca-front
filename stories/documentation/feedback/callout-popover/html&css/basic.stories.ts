import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Callout Popover/HTML&CSS',
	render: () => {
		return {
			template: `<button type="button" class="calloutPopover"><span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>1</button>`
		}
	}
} as Meta;

export const Basic: StoryObj = {};

import { Meta, StoryFn } from '@storybook/angular';

interface UserPopoverStory {}

export default {
	title: 'Documentation/Users/Popover/HTML&CSS',
} as Meta;

function getTemplate(args: UserPopoverStory): string {
	return `
	<section class="lu-popover-content userPopover skeleton is-loading" aria-busy="true">
		<div class="userPopover-details">
			<div class="userPopover-details-avatar avatar skeleton-item mod-circle" [style.--components-skeleton-shape-width]="'96px'" [style.--components-skeleton-shape-height]="'96px'"></div>
			<div class="userPopover-details-info">
				<h1 class="userPopover-details-info-name skeleton-item pr-u-margin0" [style.--components-skeleton-text-width]="'80%'"></h1>
				<p class="userPopover-details-info-detail skeleton-item pr-u-bodyS" [style.--components-skeleton-text-width]="'60%'"></p>
				<p class="userPopover-details-info-detail skeleton-item pr-u-bodyS" [style.--components-skeleton-text-width]="'40%'"></p>
				<p class="userPopover-details-info-detail skeleton-item pr-u-bodyS" [style.--components-skeleton-text-width]="'90%'"></p>
			</div>
		</div>
	</section>
	`;
}

const Template: StoryFn<UserPopoverStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Skeleton = Template.bind({});
Skeleton.args = {};

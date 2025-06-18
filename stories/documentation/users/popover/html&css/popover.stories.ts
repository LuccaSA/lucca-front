import { Meta, StoryFn } from '@storybook/angular';

interface UserPopoverStory {}

export default {
	title: 'Documentation/Users/Popover/HTML&CSS',
} as Meta;

function getTemplate(args: UserPopoverStory): string {
	return `
	<section class="lu-popover-content userPopover">
		<div class="userPopover-details">
			<div class="userPopover-details-avatar avatar">
				<div class="avatar-picture" style="background-color: rgb(92,214,153);">
					<span class="avatar-picture-initials">CA</span>
				</div>
			</div>
			<div class="userPopover-details-info">
				<h1 class="userPopover-details-info-name u-ellipsis">
					<a class="userPopover-details-info-name-linkOptional" href="#">
						Chloé Alibert
					</a>
				</h1>
				<p class="userPopover-details-info-detail u-ellipsis">Technicienne</p>
				<p class="userPopover-details-info-detail u-ellipsis">SAV</p>
				<p class="userPopover-details-info-detail">
					<!--
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarPlanning mod-S"></span>
						<span class="userPopover-details-info-detail-link-state">Arrivée prévue le 3 mai</span>
					</span>
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarStrikethrough mod-S"></span>
						<span class="userPopover-details-info-detail-link-state">Parti(e)</span>
					</span>
					-->
					<a class="userPopover-details-info-detail-workplace" href="#">
						<span
							aria-hidden="true"
							class="lucca-icon icon-calendarPlanning mod-S"
						></span>
						<span class="userPopover-details-info-detail-workplace-state">
							Absent(e) – <span class="u-textLight">Jusqu’au 28/02/2024 inclus</span>
						</span>
					</a>
				</p>
			</div>
		</div>
	</section>
	`;
}

const Template: StoryFn<UserPopoverStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};

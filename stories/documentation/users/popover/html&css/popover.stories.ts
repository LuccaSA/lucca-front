import { Meta, StoryFn } from '@storybook/angular';

interface UserPopoverStory {}

export default {
	title: 'Documentation/Users/Popover/HTML&CSS',
} as Meta;

function getTemplate(args: UserPopoverStory): string {
	return `
	<section class="lu-popover-content userPopover">
		<div class="userPopover-details">
			<div class="userPopover-details-avatar">
				<img class="picture" src="https://dummyimage.com/168/60d65c/FFF&text=%20CA%20" width="84" height="84" alt="" />
			</div>
			<div class="userPopover-details-info">
				<h1 class="userPopover-details-info-name u-ellipsis">
					<a class="userPopover-details-info-name-linkOptional" href="#">
						Chloé Alibert
					</a>
				</h1>
				<p class="userPopover-details-info-detail u-ellipsis">Technicienne</p>
				<p class="userPopover-details-info-detail u-ellipsis">SAV</p>
				<p class="userPopover-details-info-detail u-marginTopXS">
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
	styles: [
		`.picture {
			border-radius: 50%;
			display: block;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};

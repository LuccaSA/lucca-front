import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxDetailHeaderStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/Detail/Header',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxDetailHeaderStory): string {
	return `<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-illustration">
			<div class="avatar mod-M">
				<div class="avatar-picture" style="background-color: rgb(214, 92, 92)">
					<span translate="no" class="avatar-picture-initials">VV</span>
				</div>
			</div>
		</div>
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
				<div class="approbationInbox-detail-header-main-infos-description">
					<ul class="listing mod-inline mod-divider">
						<li class="listing-item">
							<div class="listing-item-content">Lorem ipsum</div>
						</li>
						<li class="listing-item">
							<div class="listing-item-content">Dolor sit amet</div>
						</li>
					</ul>
				</div>
				<div class="approbationInbox-detail-header-main-delegation">
					<span class="tag mod-M palette-none">
						<span class="tag-content pr-u-ellipsis">Délégation</span>
					</span>
				</div>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
				<span class="approbationInbox-detail-header-main-actions-more">
					<button type="button" class="button mod-onlyIcon mod-iconOnLeft mod-iconOnRight" aria-expanded="false">
						<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
						<span class="pr-u-mask">Autres options</span>
					</button>
				</span>
			</div>
		</div>
	</header>
</div>`;
}

const Template = (args: ApprobationInboxDetailHeaderStory) => ({
	props: args,
	template: getTemplate(args),
});

export const All: StoryObj<ApprobationInboxDetailHeaderStory> = {
	render: Template,
};

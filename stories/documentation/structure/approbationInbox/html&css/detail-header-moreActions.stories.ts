import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxDetailHeaderStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/Detail/Header',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxDetailHeaderStory): string {
	return `<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
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

export const MoreActions: StoryObj<ApprobationInboxDetailHeaderStory> = {
	render: Template,
};

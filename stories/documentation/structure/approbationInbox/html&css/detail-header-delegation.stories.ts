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
				<div class="approbationInbox-detail-header-main-delegation">
					<span class="tag mod-M palette-none">
						<span class="tag-content pr-u-ellipsis">Délégation</span>
					</span>
				</div>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
			</div>
		</div>
	</header>
</div>`;
}

const Template = (args: ApprobationInboxDetailHeaderStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Delegation: StoryObj<ApprobationInboxDetailHeaderStory> = {
	render: Template,
};

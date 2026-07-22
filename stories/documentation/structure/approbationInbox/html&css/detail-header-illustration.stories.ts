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

export const Illustration: StoryObj<ApprobationInboxDetailHeaderStory> = {
	render: Template,
};

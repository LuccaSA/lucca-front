import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxDetailBlockStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/Detail/Block',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxDetailBlockStory): string {
	return `<div class="approbationInbox-detail mod-insideDialog">
	<div class="approbationInbox-detail-main">
		<div class="approbationInbox-detail-main-block">
			<h3 class="approbationInbox-detail-main-block-title">Block title</h3>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
		<div class="approbationInbox-detail-main-block">
			<h3 class="approbationInbox-detail-main-block-title">Block title</h3>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
		<div class="approbationInbox-detail-main-block">
			<h3 class="approbationInbox-detail-main-block-title">Block title</h3>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
	</div>
</div>
	`;
}

const Template = (args: ApprobationInboxDetailBlockStory) => ({
	props: args,
	template: getTemplate(args),
});

export const InsideDialog: StoryObj<ApprobationInboxDetailBlockStory> = {
	render: Template,
};

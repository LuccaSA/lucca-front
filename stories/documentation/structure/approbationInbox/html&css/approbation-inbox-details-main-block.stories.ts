import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxBlockStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/Block',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxBlockStory): string {
	return `<div class="approbationInbox">
	<div class="approbationInbox-details-main-block">
		<h3 class="approbationInbox-details-main-block-title">Lorem ipsum</h3>
		Dolor sit amet
		<div class="divider approbationInbox-details-main-block-divider"></div>
	</div>
	<div class="approbationInbox-details-main-block">
		<h3 class="approbationInbox-details-main-block-title">Lorem ipsum</h3>
		Dolor sit amet
		<div class="divider approbationInbox-details-main-block-divider"></div>
	</div>
	<div class="approbationInbox-details-main-block">
		<h3 class="approbationInbox-details-main-block-title">Lorem ipsum</h3>
		Dolor sit amet
		<div class="divider approbationInbox-details-main-block-divider"></div>
	</div>
</div>`;
}

const Template = (args: ApprobationInboxBlockStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ApprobationInboxBlockStory> = {
	render: Template,
};

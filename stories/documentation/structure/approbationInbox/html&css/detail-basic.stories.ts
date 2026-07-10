import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxDetailBasicStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/Detail/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxDetailBasicStory): string {
	return `<section class="approbationInbox-detail">
	<div class="container approbationInbox-detail-container">
		Header
		<div class="approbationInbox-detail-main">
			Main
		</div>
	</div>
</section>
	`;
}

const Template = (args: ApprobationInboxDetailBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ApprobationInboxDetailBasicStory> = {
	render: Template,
};

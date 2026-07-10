import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListBasicStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListBasicStory): string {
	return `<section class="approbationInbox-list">
		<header class="approbationInbox-list-header">
			<h1 class="approbationInbox-list-header-title">À approuver <span class="numericBadge">8</span></h1>
			<div class="approbationInbox-list-header-filterBar">FilterBar</div>
		</header>
		<div class="approbationInbox-list-content">
			Content
		</div>
	</section>`;
}

const Template = (args: ApprobationInboxListBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ApprobationInboxListBasicStory> = {
	render: Template,
};

import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListStory): string {
	return `<div class="approbationInbox">
	<section class="approbationInbox-list">
		<header class="approbationInbox-list-header">
			<h1 class="approbationInbox-list-header-title">À approuver <span class="numericBadge">8</span></h1>
			<div class="approbationInbox-list-header-filterBar"></div>
		</header>
		<div class="approbationInbox-list-content">
			Lorem ipsum dolor
		</div>
	</section>
</div>`;
}

const Template = (args: ApprobationInboxListStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ApprobationInboxListStory> = {
	render: Template,
};

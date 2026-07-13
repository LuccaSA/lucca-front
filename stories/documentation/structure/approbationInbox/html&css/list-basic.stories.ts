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
	</header>
	<div class="approbationInbox-list-content">
		<ul class="approbationInbox-list-content-items">
			<li class="approbationInbox-list-content-items-item">
				<div class="approbationInbox-list-content-items-item-content">
					<div class="approbationInbox-list-content-items-item-content-info">
						Contenu
					</div>
				</div>
			</li>
		</ul>
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

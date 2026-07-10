import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListItemStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List/Item',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListItemStory): string {
	return `<div class="approbationInbox-list">
	<div class="approbationInbox-list-content-items-item">
		<div class="approbationInbox-list-content-items-item-content">
			<div class="approbationInbox-list-content-items-item-content-info">
				<div class="approbationInbox-list-content-items-item-content-info-main">
					<div class="approbationInbox-list-content-items-item-content-info-main-title">
						<a href="#" class="approbationInbox-list-content-items-item-content-action">Title</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
}

const Template = (args: ApprobationInboxListItemStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ApprobationInboxListItemStory> = {
	render: Template,
};

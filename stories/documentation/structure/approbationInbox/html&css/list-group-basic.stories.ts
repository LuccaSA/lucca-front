import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListGroupBasicStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List/Group',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListGroupBasicStory): string {
	return `<div class="approbationInbox-list">
	<div class="approbationInbox-list-content">
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="true">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="true">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
}

const Template = (args: ApprobationInboxListGroupBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ApprobationInboxListGroupBasicStory> = {
	render: Template,
};

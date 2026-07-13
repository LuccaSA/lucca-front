import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListItemStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List/Item',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListItemStory): string {
	return `<div class="approbationInbox-list">
	<ul class="approbationInbox-list-content-items">
		<li class="approbationInbox-list-content-items-item">
			<div class="approbationInbox-list-content-items-item-content">
				<div class="approbationInbox-list-content-items-item-content-info">
					<div class="approbationInbox-list-content-items-item-content-info-illustration">
						<div class="avatar mod-M">
							<div class="avatar-picture" style="background-color: rgb(214, 92, 92)">
								<span translate="no" class="avatar-picture-initials">VV</span>
							</div>
						</div>
					</div>
					<div class="approbationInbox-list-content-items-item-content-info-main">
						<div class="approbationInbox-list-content-items-item-content-info-main-title">
							<a href="#" class="approbationInbox-list-content-items-item-content-action">Title</a>
						</div>
						Metadata
					</div>
					<div class="approbationInbox-list-content-items-item-content-info-data">
						<ul class="approbationInbox-list-content-items-item-content-info-data-icons">
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-data-icons-icon">
									<span aria-hidden="true" class="lucca-icon icon-formatClipperAttachment mod-XS"></span>
									<span class="pr-u-mask">Contient une pièce jointe</span>
								</span>
							</li>
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-data-icons-icon">
									<span aria-hidden="true" class="lucca-icon icon-bubbleSpeech mod-XS"></span>
									<span class="pr-u-mask">Contient un commentaire</span>
								</span>
							</li>
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-data-icons-icon pr-u-textWarning">
									<span aria-hidden="true" class="lucca-icon icon-signWarning mod-XS"></span>
									<span class="pr-u-mask">Contient un avertissement</span>
								</span>
							</li>
						</ul>
						Data
						<div class="approbationInbox-list-content-items-item-content-info-data-subtle">Data</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>`;
}

const Template = (args: ApprobationInboxListItemStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.approbationInbox-list {
		margin: 0;
		padding: 0;
	}`,
	],
});

export const Data: StoryObj<ApprobationInboxListItemStory> = {
	render: Template,
};

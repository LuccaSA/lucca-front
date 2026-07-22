import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListFilterableStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListFilterableStory): string {
	return `<section class="approbationInbox-list">
	<header class="approbationInbox-list-header">
		<h1 class="approbationInbox-list-header-title">À approuver <span class="numericBadge">8</span></h1>
		<div class="approbationInbox-list-header-filterBar">
			<div class="filterBar">
				<div class="scrollBox filterBar-scrollBox is-firstVisible is-lastVisible">
					<div class="filterBar-scrollBox-group">
						<div class="segmentedControl filterBar-segmentedControl">
							<div class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="segmentedControl" id="segmentedControl0" checked="checked" />
								<label class="segmentedControl-item-action" for="segmentedControl0">Par vous</label>
							</div>
							<div class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="segmentedControl" id="segmentedControl1" />
								<label class="segmentedControl-item-action" for="segmentedControl1">Par d’autres</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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

const Template = (args: ApprobationInboxListFilterableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Filterable: StoryObj<ApprobationInboxListFilterableStory> = {
	render: Template,
};

import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxGroupStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/Group',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxGroupStory): string {
	return `<div class="approbationInbox">
	<div class="approbationInbox-list-groupOptional">
		<button type="button" aria-expanded="false" class="approbationInbox-list-groupOptional-header-action">
			<span class="lucca-icon icon-arrowChevronBottom approbationInbox-list-groupOptional-header-action-icon" aria-hidden="true"></span>
			Group label
		</button>
		<div class="approbationInbox-list-groupOptional-content">
			<div class="approbationInbox-list-item">
				<div class="form-field approbationInbox-list-item-formfieldOptional">
					<label class="formLabel pr-u-mask" for="ID">Sélectionner…</label>
					<span class="checkboxField">
						<input type="checkbox" class="checkboxField-input" id="ID" />
						<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
					</span>
				</div>
				<div class="slot"></div>
			</div>
			<div class="approbationInbox-list-item">
				<div class="slot"></div>
			</div>
		</div>
	</div>
	<div class="approbationInbox-list-groupOptional">
		<button type="button" aria-expanded="true" class="approbationInbox-list-groupOptional-header-action">
			<span class="lucca-icon icon-arrowChevronBottom approbationInbox-list-groupOptional-header-action-icon" aria-hidden="true"></span>
			Group label
		</button>
		<div class="approbationInbox-list-groupOptional-content">
			<div class="approbationInbox-list-item">
				<div class="form-field approbationInbox-list-item-formfieldOptional">
					<label class="formLabel pr-u-mask" for="ID">Sélectionner…</label>
					<span class="checkboxField">
						<input type="checkbox" class="checkboxField-input" id="ID" />
						<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
					</span>
				</div>
				<div class="slot"></div>
			</div>
			<div class="approbationInbox-list-item">
				<div class="slot"></div>
			</div>
		</div>
	</div>
</div>`;
}

const Template = (args: ApprobationInboxGroupStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
.slot {
	min-block-size: 4rem;
	flex-grow: 1;
	background-color: var(--palettes-grape-50);
	border-radius: var(--pr-t-border-radius-structure);
}
		`,
	],
});

export const Basic: StoryObj<ApprobationInboxGroupStory> = {
	render: Template,
};

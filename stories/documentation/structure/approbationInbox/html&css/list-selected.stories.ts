import { Meta, StoryObj } from '@storybook/angular';

interface ApprobationInboxListSelectedStory {}

export default {
	title: 'Documentation/Structure/Approbation Inbox/HTML&CSS/List/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: ApprobationInboxListSelectedStory): string {
	return `<section class="approbationInbox-list">
	<form class="approbationInbox-list-formSelectionOptional">
		<header class="approbationInbox-list-header">
			<h1 class="approbationInbox-list-header-title">À approuver <span class="numericBadge">8</span></h1>
		</header>
		<div class="approbationInbox-list-content">
			<div class="approbationInbox-list-formSelectionOptional-formfield form-field">
				<label class="formLabel" for="selectall">
					<span>Tout sélectionner</span>
				</label>
				<div class="checkboxField">
					<input type="checkbox" class="checkboxField-input" checked="checked" id="selectall">
					<span aria-hidden="true" class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</div>
			</div>
			<div class="divider"></div>
			<ul class="approbationInbox-list-content-items">
				<li class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-formfieldOptional form-field">
							<label class="formLabel pr-u-mask" for="input">
									<span>Sélectionner « Title »</span>
							</label>
							<div class="checkboxField">
									<input type="checkbox" class="checkboxField-input" checked="checked" id="input">
									<span aria-hidden="true" class="checkboxField-icon">
											<span class="checkboxField-icon-check"></span>
									</span>
							</div>
					</div>
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">
							Contenu
						</div>
					</div>
				</li>
			</ul>
		</div>
		<footer class="approbationInbox-list-footer">
			<h2 class="approbationInbox-list-footer-title">1 objet sélectionné</h2>
			<button type="submit" class="button">Approuver l’objet</button>
			<button type="button" class="button">Transférer l’objet</button>
		</footer>
	</form>
</section>`;
}

const Template = (args: ApprobationInboxListSelectedStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Selected: StoryObj<ApprobationInboxListSelectedStory> = {
	render: Template,
};

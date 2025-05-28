import { Meta, StoryFn } from '@storybook/angular';

interface PageHeaderLeadingTrainlingStory {
	sticky: boolean;
}

export default {
	title: 'Documentation/Structure/PageHeader/HTML&CSS/LeadingTrailing',
	argTypes: {},
} as Meta;

function getTemplate(args: PageHeaderLeadingTrainlingStory): string {
	return `
	<header class="pageHeader">
		<div class="pageHeader-content">
			<div class="pageHeader-content-title">
				<div class="pageHeader-content-title-leading">
					leading
				</div>
				<h1 class="pr-u-margin0">Page courante</h1>
				<div class="pageHeader-content-title-trailing">
					trailing
				</div>
				<div>
					<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="u-mask">Modifier</span>
					</button>
					<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Copier">
						<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
						<span class="u-mask">Copier</span>
					</button>
					<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Supprimer">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
						<span class="u-mask">Supprimer</span>
					</button>
				</div>
			</div>
			<div class="pageHeader-content-actions">
				<label class="textfield mod-search">
					<input class="textfield-input" type="text" placeholder="ex : Mon précieux">
					<span class="textfield-label u-mask">Rechercher</span>
				</label>
				<button type="button" class="button">Button</button>
				<button type="button" class="button mod-outline">Button</button>
				<button type="button" class="button mod-onlyIcon mod-text">
					<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
					<span class="u-mask">Voir plus</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-description">
			<p class="pr-u-marginBlockEnd0">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo.
				Nullam condimentum nulla et neque ultricies bibendum.
			</p>
		</div>
	</header>
	`;
}

const Template: StoryFn<PageHeaderLeadingTrainlingStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const PageHeaderLeadingTrainlingStory = Template.bind({});
PageHeaderLeadingTrainlingStory.args = {};

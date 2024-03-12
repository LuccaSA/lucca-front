import { Meta, StoryFn } from '@storybook/angular';

interface PageHeaderBreadcrumbStory {
	sticky: boolean;
}

export default {
	title: 'Documentation/Structure/PageHeader/Breadcrumb',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: PageHeaderBreadcrumbStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';

	return `
	<header class="pageHeader mod-withBreadcrumbs ${sticky}">
		<nav class="breadcrumbs" aria-describedby="breadcrumbs-title">
			<p id="breadcrumbs-title" class="u-mask">Breadcrumbs</p>
			<ol class="breadcrumbs-list">
				<li class="breadcrumbs-list-item"><a class="breadcrumbs-list-item-action">Page 0</a></li>
				<li class="breadcrumbs-list-item"><a class="breadcrumbs-list-item-action">Page 1</a></li>
				<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">Page 2</span></li>
			</ol>
		</nav>
		<div class="pageHeader-content">
			<div class="pageHeader-content-title">
				<h1 class="pr-u-margin0">H1. Page title</h1>
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
					<span class="u-mask">voir plus</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-description">
			<p class="pr-u-marginBottom0">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo.
				Nullam condimentum nulla et neque ultricies bibendum
				<a target="_blank">Lien<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginLeftXXXS"></span></a>.
			</p>
		</div>
	</header>
	`;
}

const Template: StoryFn<PageHeaderBreadcrumbStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const BreadcrumbPageHeader = Template.bind({});
BreadcrumbPageHeader.args = { sticky: false };

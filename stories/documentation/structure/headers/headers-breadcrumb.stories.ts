import { Meta, StoryFn } from '@storybook/angular';

interface HeadersBreadcrumbStory {}

export default {
	title: 'Documentation/Structure/Headers/Breadcrumb',
} as Meta;

function getTemplate(args: HeadersBreadcrumbStory): string {
	return `
	<header class="pageHeader mod-withBreadcrumbs">
		<nav class="breadcrumbs" aria-describedby="breadcrumbs-title">
			<p id="breadcrumbs-title" class="u-mask">Breadcrumbs</p>
			<ul class="breadcrumbs-list">
				<li class="breadcrumbs-list-item"><a class="breadcrumbs-list-item-action">You</a></li>
				<li class="breadcrumbs-list-item"><a class="breadcrumbs-list-item-action">Are</a></li>
				<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">Here</span></li>
			</ul>
		</nav>
		<div class="pageHeader-content">
			<div class="pageHeader-content-title">
				<h1 class="u-margin0 u-marginRightM">H1. Page title</h1>
				<div>
					<button type="button" class="actionIcon mod-S" luTooltip="Modifier">
						<span aria-hidden="true" class="lucca-icon icon-edit"></span>
						<span class="u-mask">Modifier</span>
					</button>
					<button type="button" class="actionIcon mod-S" luTooltip="Copier">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
						<span class="u-mask">Copier</span>
					</button>
					<button type="button" class="actionIcon mod-S" luTooltip="Supprimer">
						<span aria-hidden="true" class="lucca-icon icon-trash"></span>
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
				<button type="button" class="button mod-outline mod-icon">
					<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
					<span class="u-mask">voir plus</span>
				</button>
			</div>
		</div>
		<section class="pageHeader-description">
			<p class="u-marginBottom0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo.
				Nullam condimentum nulla et neque ultricies bibendum <a target="_blank">Lien<span aria-hidden="true" class="lucca-icon icon-outside mod-XS u-marginLeftXXS"></span></a>.
			</p>
		</section>
	</header>
	`;
}

const Template: StoryFn<HeadersBreadcrumbStory> = (args: HeadersBreadcrumbStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Breadcrumb = Template.bind({});
Breadcrumb.args = {};

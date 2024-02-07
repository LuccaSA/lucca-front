import { Meta, StoryFn } from '@storybook/angular';

interface PageHeaderMenuStory {
	sticky: boolean;
}

export default {
	title: 'Documentation/Structure/PageHeader/Menu',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: PageHeaderMenuStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';

	return `
	<header class="pageHeader mod-withMenu">
		<div class="pageHeader-content">
			<div class="pageHeader-content-title">
				<h1 class="pr-u-margin0">H1. Page title</h1>
				<div>
					<button type="button" class="actionIcon" luTooltip="Modifier">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="u-mask">Modifier</span>
					</button>
					<button type="button" class="actionIcon" luTooltip="Copier">
						<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
						<span class="u-mask">Copier</span>
					</button>
					<button type="button" class="actionIcon" luTooltip="Supprimer">
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
				<button type="button" class="actionIcon">
					<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
					<span class="u-mask">voir plus</span>
				</button>
			</div>
		</div>
		<section class="pageHeader-description">
			<p class="pr-u-marginBottom0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo.
				Nullam condimentum nulla et neque ultricies bibendum <a target="_blank">Lien<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginLeftXXXS"></span></a>.
			</p>
		</section>
		<nav class="menu">
			<ul class="menu-list">
				<li class="menu-list-item">
					<a
						class="menu-list-item-action"
						href="#"
						aria-current="page"
					>
						Tab
					</a>
				</li>
				<li class="menu-list-item">
					<a
						class="menu-list-item-action"
						href="#"
					>
						Tab
					</a>
				</li>
				<li class="menu-list-item">
					<a
						class="menu-list-item-action"
						href="#"
					>
						Tab
					</a>
				</li>
			</ul>
		</nav>
	</header>
	`;
}

const Template: StoryFn<PageHeaderMenuStory> = (args: PageHeaderMenuStory) => ({
	props: args,
	template: getTemplate(args),
});

export const MenuPageHeader = Template.bind({});
MenuPageHeader.args = { sticky: false };

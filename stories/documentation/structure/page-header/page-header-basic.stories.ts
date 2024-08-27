import { Meta, StoryFn } from '@storybook/angular';

interface PageHeaderBasicStory {
	sticky: boolean;
}

export default {
	title: 'Documentation/Structure/PageHeader/Basic',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: PageHeaderBasicStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';

	return `
	<header class="pageHeader rwd-autoContainer ${sticky}">
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
				<a href="#" target="_blank">Lien<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginLeft50"></span></a>.
			</p>
		</div>
	</header>
	`;
}

const Template: StoryFn<PageHeaderBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}
		`,
	],
});

export const BasicPageHeader = Template.bind({});
BasicPageHeader.args = { sticky: false };

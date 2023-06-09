import { Meta, Story } from '@storybook/angular';

interface HeadersBasicStory {
	noShadow: boolean;
	sticky: boolean;
}

export default {
	title: 'Documentation/Structure/Headers/Basic',
	argTypes: {
		noShadow: {
			description: "Supprime l'ombre portée du header",
			control: {
				type: 'boolean',
			},
		},
		sticky: {
			description: "Rend le header toujours visible au scroll en s'adaptant à la position du menu principal et secondaire.",
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: HeadersBasicStory): string {
	const noShadow = args.noShadow ? `mod-noShadow` : '';
	const sticky = args.sticky ? `mod-sticky` : '';
	return `
	<header class="pageHeader ${noShadow} ${sticky}">
		<div class="pageHeader-content">
			<div class="pageHeader-content-title">
				<h1 class="u-margin0 u-marginRightM">H1. Page title</h1>
				<div>
					<button type="button" class="actionIcon" luTooltip="Modifier">
						<span aria-hidden="true" class="lucca-icon icon-edit"></span>
						<span class="u-mask">Modifier</span>
					</button>
					<button type="button" class="actionIcon" luTooltip="Copier">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
						<span class="u-mask">Copier</span>
					</button>
					<button type="button" class="actionIcon" luTooltip="Supprimer">
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

const Template: Story<HeadersBasicStory> = (args: HeadersBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { noShadow: false, sticky: false };

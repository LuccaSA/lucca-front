import { Meta, StoryFn } from '@storybook/angular';

interface LinkNoWrapStory {
}

export default {
	title: 'Documentation/Actions/Link/NoWrap',
	argTypes: {
	},
} as Meta;

function getTemplate(args: LinkNoWrapStory): string {
	return `<a class="link mod-icon" href="#" target="_blank">
		Lien externe sans retour à la ligne possible avant l’icône<span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span>
	</a>`;
}

const Template: StoryFn<LinkNoWrapStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}
		a {
			margin-right: 1rem;
		}
		`,
	],
});

export const NoWrapLink = Template.bind({});
NoWrapLink.args = {};

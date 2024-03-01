import { Meta, StoryFn } from '@storybook/angular';

interface LinkDisabledStory {
}

export default {
	title: 'Documentation/Actions/Link/Disabled',
	argTypes: {
	},
} as Meta;

function getTemplate(args: LinkDisabledStory): string {
	return `<a href="#" class="link is-disabled">Lien</a>
<a class="link is-disabled mod-icon" href="#" target="_blank">Lien externe <span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span></a>`;
}

const Template: StoryFn<LinkDisabledStory> = (args) => ({
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

export const DisabledLink = Template.bind({});
DisabledLink.args = {};

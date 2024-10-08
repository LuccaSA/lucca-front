import { Meta, StoryFn } from '@storybook/angular';

interface LinkDecorationHoverStory {}

export default {
	title: 'Documentation/Actions/Link/DecorationHover',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkDecorationHoverStory): string {
	return `<a href="#" class="link mod-decorationHover">Lien</a>
<a class="link mod-decorationHover mod-icon" href="#" target="_blank">Lien externe<!-- no text node here --><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span></a>`;
}

const Template: StoryFn<LinkDecorationHoverStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			gap: var(--pr-t-spacings-200);
		}
		`,
	],
});

export const DecorationHoverLink = Template.bind({});
DecorationHoverLink.args = {};

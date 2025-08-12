import { Meta, StoryFn } from '@storybook/angular';

interface LinkDecorationHoverStory {}

export default {
	title: 'Documentation/Actions/Link/DecorationHover',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkDecorationHoverStory): string {
	return `<a href="#" class="link mod-decorationHover">Text link</a>
<a class="link mod-decorationHover mod-icon" href="#" target="_blank">Text link<!-- no text node here --><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span><span class="pr-u-mask">Open in a new window</span></a>`;
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

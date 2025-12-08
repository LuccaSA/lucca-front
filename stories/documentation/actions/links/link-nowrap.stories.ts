import { Meta, StoryFn } from '@storybook/angular';

interface LinkNoWrapStory {}

export default {
	title: 'Documentation/Actions/Link/NoWrap',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkNoWrapStory): string {
	return `<a class="link mod-icon" href="#" target="_blank">
	<span class="link-text">Text link (without icon wrap)</span><!-- no text node here --><span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span><span class="pr-u-mask">Open in a new window</span>
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
		`,
	],
});

export const NoWrapLink = Template.bind({});
NoWrapLink.args = {};

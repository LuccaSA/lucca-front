import { Meta, StoryObj } from '@storybook/angular';

interface LinkBasicStory {}

export default {
	title: 'Documentation/Actions/Link/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	return `<a href="#" class="link">Text link</a>
<a class="link mod-icon" href="#" target="_blank">Text link<!-- no text node here --><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span><span class="pr-u-mask">Open in a new window</span></a>
`;
}

const Template = (args: LinkBasicStory) => ({
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

export const BasicLink: StoryObj<LinkBasicStory> = {
	args: {},
	render: Template,
};

import { Meta, StoryFn } from '@storybook/angular';

interface LinkBasicStory {}

export default {
	title: 'Documentation/Actions/Link/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	return `<a href="#" class="link">Text link</a>
<br /><br />
<a class="link mod-icon" href="#" target="_blank">Text link<!-- no text node here --><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span><span class="pr-u-mask">Open in a new window</span></a>
`;
}

const Template: StoryFn<LinkBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const BasicLink = Template.bind({});
BasicLink.args = {};

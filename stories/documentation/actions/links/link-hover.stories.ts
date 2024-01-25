import { Meta, StoryFn } from '@storybook/angular';

interface LinkHoverStory {}

export default {
	title: 'Documentation/Actions/Link/Hover',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkHoverStory): string {
	return `
<a href="#" class="link mod-decorationHover">Lorem ipsum dolor</a>
`;
}

const Template: StoryFn<LinkHoverStory> = (args: LinkHoverStory) => ({
	props: args,
	template: getTemplate(args),
});

export const HoverLink = Template.bind({});
HoverLink.args = {};

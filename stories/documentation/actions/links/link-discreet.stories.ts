import { Meta, StoryObj } from '@storybook/angular';

interface LinkBasicStory {}

export default {
	title: 'Documentation/Actions/Link/Discreet',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	return `<a href="#" class="link mod-discreet">Text link</a>
`;
}

const Template = (args: LinkBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const BasicLink: StoryObj<LinkBasicStory> = {
	args: {},
	render: Template,
};

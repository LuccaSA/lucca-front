import { Meta, StoryFn } from '@storybook/angular';

interface LinkDisabledStory {}

export default {
	title: 'Documentation/Actions/Link/Disabled',
} as Meta;

function getTemplate(args: LinkDisabledStory): string {
	return `
<a href="#" class="link is-disabled">Lorem ipsum dolor</a>
`;
}

const Template: StoryFn<LinkDisabledStory> = (args: LinkDisabledStory) => ({
	props: args,
	template: getTemplate(args),
});

export const DisabledLink = Template.bind({});
DisabledLink.args = {};

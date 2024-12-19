import { Meta, StoryFn } from '@storybook/angular';

interface LinkDisabledStory {}

export default {
	title: 'Documentation/Actions/Link/Disabled',
	argTypes: {},
} as Meta;

function getTemplate(args: LinkDisabledStory): string {
	return `<span class="link is-disabled">Text link</span>
<span class="link is-disabled mod-icon">Text link<!-- no text node here --><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>`;
}

const Template: StoryFn<LinkDisabledStory> = (args) => ({
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

export const DisabledLink = Template.bind({});
DisabledLink.args = {};

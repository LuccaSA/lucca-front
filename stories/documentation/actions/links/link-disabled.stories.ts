import { Meta, StoryFn } from '@storybook/angular';

interface LinkDisabledStory {
}

export default {
	title: 'Documentation/Actions/Link/Disabled',
	argTypes: {
	},
} as Meta;

function getTemplate(args: LinkDisabledStory): string {
	return `<span class="link is-disabled">Lien</span>
<span class="link is-disabled mod-icon">Lien externe <span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>`;
}

const Template: StoryFn<LinkDisabledStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}
		span {
			margin-right: 1rem;
		}
		`,
	],
});

export const DisabledLink = Template.bind({});
DisabledLink.args = {};

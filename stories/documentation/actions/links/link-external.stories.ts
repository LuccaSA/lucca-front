import { Meta, StoryFn } from '@storybook/angular';

interface LinkExternalStory {
	noIconWidow: boolean;
}

export default {
	title: 'Documentation/Actions/Link/External',
	argTypes: {
		noIconWidow: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: LinkExternalStory): string {
	if (args.noIconWidow) {
		return `
<a class="link mod-icon" href="#" target="_blank" rel="noreferrer" rel="noopener">
	<span class="link-text">Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor</span><span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>
	<span class="u-mask">(ouvrir dans une nouvelle fenêtre)</span>
</a>

`;
	} else {
		return `
<a class="link mod-icon" href="#" target="_blank" rel="noreferrer" rel="noopener">
	Lorem ipsum dolor<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span>
	<span class="u-mask">(ouvrir dans une nouvelle fenêtre)</span>
</a>
`;
	}
}

const Template: StoryFn<LinkExternalStory> = (args: LinkExternalStory) => ({
	props: args,
	template: getTemplate(args),
});

export const ExternalLink = Template.bind({});
ExternalLink.args = { noIconWidow: false };

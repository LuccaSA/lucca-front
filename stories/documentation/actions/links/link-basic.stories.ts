import { Meta, Story } from '@storybook/angular';

interface LinkBasicStory {}

export default {
	title: 'Documentation/Actions/Link/Basic',
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	return `
<a href="#" class="link">Lien</a>
<a class="link mod-icon" href="#" target="_blank">Lien externe<span aria-hidden="true" class="lucca-icon icon-outside"></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span></a>
	`;
}

const Template: Story<LinkBasicStory> = (args: LinkBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}
		a {
			margin-right: 1rem;
		}`,
	],
});

export const BasicLink = Template.bind({});
BasicLink.args = {};

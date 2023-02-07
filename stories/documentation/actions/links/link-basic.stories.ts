import { Meta, Story } from '@storybook/angular';

interface LinkBasicStory {
		disabled: boolean;
}

export default {
	title: 'Documentation/Actions/Link/Basic',
	argTypes: {
		disabled: {
			options: ['', 'is-disabled'],
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	const disabled = args.disabled ? `is-disabled` : '';
	return `
<a href="#" class="link ${disabled}">Lien</a>
<a class="link mod-icon ${disabled}" href="#" target="_blank">Lien externe<span aria-hidden="true" class="lucca-icon icon-outside"></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span></a>
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
BasicLink.args = { disabled: false };

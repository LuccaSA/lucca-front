import { Meta, Story } from '@storybook/angular';

interface LinkBasicStory {
		disabled: boolean;
		decoration: string;
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
		decoration: {
			options: ['', 'mod-decorationNone', 'mod-decorationHover'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	const classes = [args.decoration].filter(Boolean).join(' ');
	const disabled = args.disabled ? `is-disabled` : '';

	return `
<a href="#" class="link ${classes} ${disabled}">Lien</a>
<a class="link mod-icon ${classes} ${disabled}" href="#" target="_blank">Lien externe<span aria-hidden="true" class="lucca-icon icon-outside"></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span></a>
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
BasicLink.args = { disabled: false, decoration: '' };

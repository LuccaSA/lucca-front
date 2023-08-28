import { Meta, StoryFn } from '@storybook/angular';

interface LinkBasicStory {
	disabled: boolean;
	decorationHover: boolean;
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
		decorationHover: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	const disabled = args.disabled ? `is-disabled` : '';
	const decorationHover = args.decorationHover ? `mod-decorationHover` : '';

	return `<a href="#" class="link ${decorationHover} ${disabled}">Lien</a>
<a class="link mod-icon ${decorationHover} ${disabled}" href="#" target="_blank">Lien externe<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span><span class="u-mask">Ouvrir dans une nouvelle fenêtre</span></a>`;
}

const Template: StoryFn<LinkBasicStory> = (args: LinkBasicStory) => ({
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
BasicLink.args = { disabled: false, decorationHover: false };

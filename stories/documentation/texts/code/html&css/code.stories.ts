import { Meta, StoryObj } from '@storybook/angular';

interface TextCodeStory {
	block: boolean;
}

export default {
	title: 'Documentation/Texts/Code/HTML&CSS/Basic',
	argTypes: {
		block: {
			control: {
				type: 'boolean',
			},
			description: 'Permet un affichage sur plusieurs lignes.',
		},
	},
} as Meta;

function getTemplate(args: TextCodeStory): string {
	const block = args.block ? `mod-block` : '';
	return `Lorem
<code class="code ${block}">ipsum
dolor
sit</code>
amet`;
}

const Template = (args: TextCodeStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
			min-block-size: 145px;
		}`,
	],
});

export const Basic: StoryObj<TextCodeStory> = {
	args: { block: false },
	render: Template,
};

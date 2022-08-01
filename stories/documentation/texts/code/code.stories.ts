import { Meta, Story } from '@storybook/angular';

interface TextCodeStory {
	block: boolean;
}

export default {
	title: 'Documentation/Texts/Code/Basic',
	argTypes: {
		block: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TextCodeStory): string {
	const block = args.block ? `mod-block` : '';
	return `Lorem
<code class="code ${block}">ipsum
dolor sit</code>
amet
	`;
}

const Template: Story<TextCodeStory> = (args: TextCodeStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
			min-height: 145px;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { block: false };

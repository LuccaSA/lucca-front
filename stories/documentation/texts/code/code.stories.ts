import { Meta, StoryFn } from '@storybook/angular';

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
dolor
sit</code>
amet`;
}

const Template: StoryFn<TextCodeStory> = (args) => ({
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

export const Basic = Template.bind({});
Basic.args = { block: false };

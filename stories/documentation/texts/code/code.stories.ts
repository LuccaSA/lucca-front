import { Meta, Story } from '@storybook/angular';

interface TextCodeStory {
	mod: string;
}

export default {
	title: 'Documentation/Texts/Code/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-block'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

function getTemplate(args: TextCodeStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');
	return `Lorem
<code class="code ${classes}">ipsum
dolor</code>
sit amet
	`;
}

const Template: Story<TextCodeStory> = (args: TextCodeStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
			height: 8rem;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { mod: '' };

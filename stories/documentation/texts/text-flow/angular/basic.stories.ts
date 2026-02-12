import { TextFlowComponent } from '@lucca-front/ng/text-flow';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface TextFlowBasicStory {}

export default {
	title: 'Documentation/Texts/Text flow/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [TextFlowComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: TextFlowBasicStory): string {
	return `<lu-text-flow>
	<h1>Heading 1</h1>
	<h2>Heading 2</h2>
	<p>Paragraph</p>
	<p>Paragraph</p>
	<h2>Heading 2</h2>
	<p>Paragraph</p>
	<ul>
		<li>List item</li>
		<li>List item</li>
		<li>List item</li>
	</ul>
	<h3>Heading 3</h3>
	<p>Paragraph</p>
	<h4>Heading 4</h4>
	<ol>
		<li>List item</li>
		<li>List item</li>
		<li>List item</li>
	</ol>
</lu-text-flow>`;
}

const Template = (args: TextFlowBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<TextFlowBasicStory> = {
	args: {},
	render: Template,
};

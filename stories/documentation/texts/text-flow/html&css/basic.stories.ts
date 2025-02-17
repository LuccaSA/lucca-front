import { Meta, StoryFn } from '@storybook/angular';

interface TextFlowBasicStory {}

export default {
	title: 'Documentation/Texts/Text flow/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: TextFlowBasicStory): string {
	return `<div class="textFlow">
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
</div>

<!-- To tell the ui-diff tool that the page has finished rendering -->
<span id="ready"></span>
`;
}

const Template: StoryFn<TextFlowBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};

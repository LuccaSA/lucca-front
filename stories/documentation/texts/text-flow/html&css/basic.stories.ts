import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Text flow/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
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
</div>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};

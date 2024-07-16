import { Meta, StoryFn } from '@storybook/angular';

interface ResetStory {}

export default {
	title: 'Documentation/Integration/Utilities/Reset',
} as Meta;

function getTemplate(args: ResetStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<code class="code">u-buttonReset</code>
		<button class="u-buttonReset">Button</button>
	</div>
	<div class="demo-utility">
		<code class="code">u-listReset</code>
		<ul class="u-listReset">
			<li>List item</li>
			<li>List item</li>
			<li>List item</li>
		</ul>
	</div>
	<div class="demo-utility">
		<code class="code">u-descriptionListReset</code>
		<dl class="u-descriptionListReset">
			<dt>Term</dt>
			<dd>Description</dd>
		</dl>
	</div>
</div>`;
}

const Template: StoryFn<ResetStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Reset = Template.bind({});
Reset.args = {};

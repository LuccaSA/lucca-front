import { Meta, StoryFn } from '@storybook/angular';

interface ResetStory {}

export default {
	title: 'Documentation/Integration/Utilities/Reset',
} as Meta;

function getTemplate(args: ResetStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<code class="code">pr-u-buttonReset</code>
		<button class="pr-u-buttonReset">Button</button>
	</div>
	<div class="demo-utility">
		<code class="code">pr-u-listReset</code>
		<ul class="pr-u-listReset">
			<li>List item</li>
			<li>List item</li>
			<li>List item</li>
		</ul>
	</div>
	<div class="demo-utility">
		<code class="code">pr-u-descriptionListReset</code>
		<dl class="pr-u-descriptionListReset">
			<dt>Term</dt>
			<dd>Description</dd>
		</dl>
	</div>
	<div class="demo-utility">
		<code class="code">pr-u-summaryReset</code>
		<details>
			<summary class="pr-u-summaryReset"><span class="tag">v19.1</span><br>Summary</summary>
			Details
		</details>
	</div>
</div>`;
}

const Template: StoryFn<ResetStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Reset = Template.bind({});
Reset.args = {};

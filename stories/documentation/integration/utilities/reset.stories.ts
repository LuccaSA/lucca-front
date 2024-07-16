import { Meta, StoryFn } from '@storybook/angular';

interface ResetStory {}

export default {
	title: 'Documentation/Integration/Utilities/Reset',
} as Meta;

function getTemplate(args: ResetStory): string {
	return `
<div>
	<div>
		<button class="u-buttonReset"><code class="code">u-buttonReset</code></button>
	</div>
	<div>
		<ul class="u-listReset">
			<li><code class="code">u-listReset</code></li>
			<li><code class="code">u-listReset</code></li>
			<li><code class="code">u-listReset</code></li>
		</ul>
	</div>
	<div>
		<ol class="u-listReset">
			<li><code class="code">u-listReset</code></li>
			<li><code class="code">u-listReset</code></li>
			<li><code class="code">u-listReset</code></li>
		</ol>
	</div>
	<div>
		<dl class="u-descriptionListReset">
			<dt><code class="code">u-descriptionListReset</code></dt>
			<dd><code class="code">u-descriptionListReset</code></dd>
			<dd><code class="code">u-descriptionListReset</code></dd>
		</dl>
	</div>
</div>
`;
}

const Template: StoryFn<ResetStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-500);
			display: flex;
			flex-direction: column;

			> div {
				display: flex;
				gap: var(--pr-t-spacings-100);
				flex-wrap: wrap; 
				align-items: flex-start;

				> div { 	
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const Reset = Template.bind({});
Reset.args = {};

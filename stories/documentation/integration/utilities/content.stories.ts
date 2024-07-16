import { Meta, StoryFn } from '@storybook/angular';

interface ResetStory {}

export default {
	title: 'Documentation/Integration/Utilities/Content',
} as Meta;

function getTemplate(args: ResetStory): string {
	return `
<div>
	<div><code class="code">data-content-before</code> <span data-content-before="Lorem ipsum"></span></div>
	<div><code class="code">data-content-after</code> <span data-content-after="Lorem ipsum"></span></div>
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

export const Content = Template.bind({});
Content.args = {};

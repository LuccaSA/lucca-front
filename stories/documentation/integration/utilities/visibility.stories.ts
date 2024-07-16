import { Meta, StoryFn } from '@storybook/angular';

interface VisibilityStory {}

export default {
	title: 'Documentation/Integration/Utilities/Visibility',
} as Meta;

function getTemplate(args: VisibilityStory): string {
	return `
<div>
	<div><code class="code">u-visibilityHidden</code> <span class="u-visibilityHidden">Lorem ipsum</span></div>
	<div><code class="code">u-visibilityVisible</code> <span class="u-visibilityVisible">Lorem ipsum</span></div>
</div>
`;
}

const Template: StoryFn<VisibilityStory> = (args) => ({
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

export const Visibility = Template.bind({});
Visibility.args = {};

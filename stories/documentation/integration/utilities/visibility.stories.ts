import { Meta, StoryFn } from '@storybook/angular';

interface VisibilityStory {}

export default {
	title: 'Documentation/Integration/Utilities/Visibility',
} as Meta;

function getTemplate(args: VisibilityStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">pr-u-visibilityHidden</code> <span class="pr-u-visibilityHidden">Lorem ipsum</span></div>
	<div class="demo-utility"><code class="code">pr-u-visibilityVisible</code> <span class="pr-u-visibilityVisible">Lorem ipsum</span></div>
</div>
`;
}

const Template: StoryFn<VisibilityStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Visibility = Template.bind({});
Visibility.args = {};

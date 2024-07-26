import { Meta, StoryFn } from '@storybook/angular';

interface ResetStory {}

export default {
	title: 'Documentation/Integration/Utilities/Content',
} as Meta;

function getTemplate(args: ResetStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="demo-utility"><code class="code">data-content-before</code> <span data-content-before="Lorem ipsum"></span></div>
	<div class="demo-utility"><code class="code">data-content-after</code> <span data-content-after="Lorem ipsum"></span></div>
</div>`;
}

const Template: StoryFn<ResetStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Content = Template.bind({});
Content.args = {};

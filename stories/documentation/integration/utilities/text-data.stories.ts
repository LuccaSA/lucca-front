import { Meta, StoryFn } from '@storybook/angular';

interface TextDataStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextData',
} as Meta;

function getTemplate(args: TextDataStory): string {
	return `
<div class="demo-utilityWrapper">
	<div class="demo-utility">
		<code class="code">data-content-before</code>
		<div data-content-before="Lorem ipsum" aria-hidden="true"></div>
	</div>
	<div class="demo-utility">
		<code class="code">data-content-after</code>
		<div data-content-after="Sit amet" aria-hidden="true"></div>
	</div>
</div>`;
}

const Template: StoryFn<TextDataStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const TextData = Template.bind({});
TextData.args = {};

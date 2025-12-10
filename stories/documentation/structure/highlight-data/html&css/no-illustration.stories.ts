import { Meta, StoryObj } from '@storybook/angular';

interface NoIllustrationStory {}

export default {
	title: 'Documentation/Structure/Highlight data/HTML&CSS/No illustration',
	argTypes: {},
} as Meta;

function getTemplate(args: NoIllustrationStory): string {
	return `<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
</div>`;
}

const Template = (args: NoIllustrationStory) => ({
	props: args,
	template: getTemplate(args),
});

export const NoIllustration: StoryObj<NoIllustrationStory> = {
	args: {},
	render: Template,
};

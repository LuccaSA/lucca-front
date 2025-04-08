import { Meta, StoryFn } from '@storybook/angular';

interface NoIllustrationStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/No illustration',
	argTypes: {},
} as Meta;

function getTemplate(args: NoIllustrationStory): string {
	return `<div class="highlightSection">
	<div class="highlightSection-content">
		<div class="textFlow">
			<h2>Title</h2>
			<p>First paragraph. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<p>Second paragraph shows a <a luLink>Link</a>.</p>
		</div>
	</div>
</div>`;
}

const Template: StoryFn<NoIllustrationStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const NoIllustration = Template.bind({});
NoIllustration.args = {};

import { Meta, StoryFn } from '@storybook/angular';

interface CommentSmallStory {}

export default {
	title: 'Documentation/Texts/Comment/HTML&CSS/Small',
	argTypes: {},
} as Meta;

function getTemplate(args: CommentSmallStory): string {
	return `<div class="comment mod-S">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>&ngsp;
			<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
		</div>
	</div>
	<blockquote class="comment-content">
		<p class="comment-content-text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla
			iste neque ex?
		</p>
	</blockquote>
</div>`;
}

const Template: StoryFn<CommentSmallStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.avatar {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			background-color: red;
			flex-shrink: 0;
		}`,
	],
});

export const Small = Template.bind({});
Small.args = {};

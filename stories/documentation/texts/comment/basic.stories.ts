import { Meta, StoryFn } from '@storybook/angular';

interface CommentBasicStory {}

export default {
	title: 'Documentation/Texts/Comment/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: CommentBasicStory): string {
	return `<div class="comment">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			<span class="comment-infos-date">lun. 4 janv. à 16:50</span>
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

const Template: StoryFn<CommentBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.avatar {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			background: red;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};

import { Meta, StoryFn } from '@storybook/angular';

interface CommentNoAvatarStory {}

export default {
	title: 'Documentation/Texts/Comment/HTML&CSS/NoAvatar',
	argTypes: {},
} as Meta;

function getTemplate(args: CommentNoAvatarStory): string {
	return `<div class="comment mod-noAvatar">
	<div class="comment-infos">
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

const Template: StoryFn<CommentNoAvatarStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const NoAvatar = Template.bind({});
NoAvatar.args = {};

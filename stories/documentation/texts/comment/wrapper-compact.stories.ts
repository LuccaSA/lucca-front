import { Meta, StoryFn } from '@storybook/angular';

interface CommentWrapperCompactStory {}

export default {
	title: 'Documentation/Texts/Comment/HTML&CSS/WrapperCompact',
	argTypes: {},
} as Meta;

function getTemplate(args: CommentWrapperCompactStory): string {
	return `<ol class="commentWrapper">
	<li class="commentWrapper-item mod-WrapperAvatar">
		<div class="comment">
			<div class="comment-infos">
				<div class="avatar"></div>
				<div class="comment-infos-content">
					<span class="comment-infos-name">Marie Bragoulet</span>
					<span class="comment-infos-date">lun. 4 janv. à 16:50</span>
				</div>
			</div>
			<blockquote class="comment-content">
				<p class="comment-content-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident
					nulla iste neque ex?
				</p>
			</blockquote>
		</div>
	</li>
	<li class="commentWrapper-item">
		<div class="comment mod-noAvatar">
			<blockquote class="comment-content">
				<p class="comment-content-text">Lorem ipsum dolor sit amet</p>
			</blockquote>
		</div>
	</li>
	<li class="commentWrapper-item">
		<div class="comment mod-noAvatar">
			<blockquote class="comment-content">
				<p class="comment-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
			</blockquote>
		</div>
	</li>
</ol>`;
}

const Template: StoryFn<CommentWrapperCompactStory> = (args) => ({
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

export const WrapperCompact = Template.bind({});
WrapperCompact.args = {};

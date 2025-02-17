import { Meta, StoryFn } from '@storybook/angular';

interface CommentChatStory {}

export default {
	title: 'Documentation/Texts/Comment/HTML&CSS/Chat',
	argTypes: {},
} as Meta;

function getTemplate(args: CommentChatStory): string {
	return `<ol class="commentWrapperChat">
	<li class="commentWrapper">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Marie Bragoulet</span>&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident
						nulla iste neque ex ?
					</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper mod-chatAnswer">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Daniel Hernandez</span>&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Temporibus a veniam necessitatibus aut facilis repellendus provident
					nulla iste neque ex. Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Marie Bragoulet</span>&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper mod-chatAnswer">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Daniel Hernandez</span>&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Lorem ipsum dolor sit amet,</p>
				</blockquote>
			</div>
		</div>
	</li>
	<li class="commentWrapper mod-chatAnswer">
		<div class="commentWrapper-item">
			<div class="comment">
				<div class="comment-infos">
					<div class="avatar"></div>
					<div class="comment-infos-content">
						<span class="comment-infos-name">Daniel Hernandez</span>&ngsp;
						<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
					</div>
				</div>
				<blockquote class="comment-content">
					<p class="comment-content-text">Lorem</p>
				</blockquote>
			</div>
		</div>
	</li>
</ol>`;
}

const Template: StoryFn<CommentChatStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.avatar {
			inline-size: 1.5rem;
			block-size: 1.5rem;
			border-radius: 50%;
			background: var(--palettes-neutral-100) url("https://cdn.lucca.fr/lucca-front/avatars/finn.png") center;
			background-size: cover;
			flex-shrink: 0;
		}
		.mod-answer .avatar {
			background-image: url("https://cdn.lucca.fr/lucca-front/avatars/bob.jpg");
		}
		`,
	],
});

export const Chat = Template.bind({});
Chat.args = {};

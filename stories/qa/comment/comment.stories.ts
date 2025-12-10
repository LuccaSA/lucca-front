import { Component, LOCALE_ID } from '@angular/core';
import { CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'comment-stories',
	templateUrl: './comment.stories.html',
	imports: [CommentComponent, CommentBlockComponent, LuUserPictureComponent],
	styles: [
		`
			.comment {
				margin-block-end: var(--pr-t-spacings-200);
			}
			.avatar {
				inline-size: 1.5rem;
				block-size: 1.5rem;
				border-radius: 50%;
				background: var(--palettes-neutral-100) url('https://cdn.lucca.fr/lucca-front/avatars/finn.png') center;
				background-size: cover;
				flex-shrink: 0;
			}
		`,
	],
})
class CommentStory {
	date = new Date();
}

export default {
	title: 'QA/Comment',
	component: CommentStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

const template: StoryFn<CommentStory> = () => ({});

export const basic = template.bind({});

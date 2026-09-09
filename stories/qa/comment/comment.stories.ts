import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'comment-stories',
	templateUrl: './comment.stories.html',
	imports: [CommentComponent, CommentBlockComponent, LuUserPictureComponent, CommentChatComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CommentStory {
	date = new Date('2026-01-15T10:30:00Z');
	formatedSample = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.

	Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex? `;
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

const template = () => ({});

export const Basic: StoryObj<CommentStory> = {
	args: {},
	render: template,
};

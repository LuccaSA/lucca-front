import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { COMMENT_CHAT_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment-chat',
	imports: [],
	templateUrl: './comment-chat.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,

	providers: [
		{
			provide: COMMENT_CHAT_INSTANCE,
			useExisting: forwardRef(() => CommentChatComponent),
		},
	],
})
export class CommentChatComponent {}

import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, forwardRef, inject, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { CommentComponent } from '../comment/comment.component';
import { COMMENT_BLOCK_INSTANCE, COMMENT_CHAT_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment-block',
	imports: [NgTemplateOutlet],
	templateUrl: './comment-block.component.html',
	host: {
		'[attr.role]': 'role',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: COMMENT_BLOCK_INSTANCE,
			useExisting: forwardRef(() => CommentBlockComponent),
		},
	],
})
export class CommentBlockComponent {
	#chatBlock = inject(COMMENT_CHAT_INSTANCE, { optional: true });

	readonly comments = contentChildren(CommentComponent, { read: CommentComponent, descendants: true });

	readonly compact = input(false, { transform: booleanAttribute });

	readonly small = input(false, { transform: booleanAttribute });

	readonly chatAnswer = input(false, { transform: booleanAttribute });

	readonly authorName = input<PortalContent>();

	readonly avatar = input<TemplateRef<unknown>>();

	readonly size = input<'S' | 'M'>();

	readonly noAvatar = computed(() => !this.avatar());
	readonly isSingleComment = computed(() => this.comments().length === 1);
	readonly role = this.#chatBlock ? 'listitem' : null;
}

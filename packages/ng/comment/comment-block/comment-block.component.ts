import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, forwardRef, inject, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, PortalContent } from '@lucca-front/ng/core';
import { CommentBlockSize } from '../comment.type';
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

	readonly compact = input(false, { transform: luBooleanAttribute });

	/**
	 * Apply the small size to the comment block wrapper
	 *
	 * Independent from the size input, which applies to each comment of the block
	 */
	readonly small = input(false, { transform: luBooleanAttribute });

	readonly chatAnswer = input(false, { transform: luBooleanAttribute });

	readonly authorName = input<PortalContent>();

	readonly avatar = input<TemplateRef<unknown>>();

	/**
	 * Which size should each comment of the block be? `S` applies the small size
	 */
	readonly size = input<CommentBlockSize>();

	readonly noAvatar = computed(() => !this.avatar());
	readonly isSingleComment = computed(() => this.comments().length === 1);
	readonly role = this.#chatBlock ? 'listitem' : null;
}

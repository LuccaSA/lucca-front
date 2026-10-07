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

	/**
	 * Only displays the author infos on the first comment of the block
	 */
	readonly compact = input(false, { transform: luBooleanAttribute });

	/**
	 * Reduces the text size of all the comments of the block, by setting `mod-S` on the comments wrapper.
	 *
	 * It has the same visual result as `size="S"` but is applied independently: `size="M"` does not override it
	 */
	readonly small = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays the block as an answer in a `lu-comment-chat` (aligned to the end, product background)
	 */
	readonly chatAnswer = input(false, { transform: luBooleanAttribute });

	/**
	 * Name of the author, displayed in the infos of the comments
	 */
	readonly authorName = input<PortalContent>();

	/**
	 * Template of the author avatar (usually a `lu-user-picture`). Without it, no avatar is displayed
	 */
	readonly avatar = input<TemplateRef<unknown>>();

	/**
	 * Which size should the comments of the block be? Defaults to M (no value).
	 *
	 * `size="S"` sets `mod-S` on each comment; it is independent from the `small` input
	 */
	readonly size = input<CommentBlockSize>();

	readonly noAvatar = computed(() => !this.avatar());
	readonly isSingleComment = computed(() => this.comments().length === 1);
	readonly role = this.#chatBlock ? 'listitem' : null;
}

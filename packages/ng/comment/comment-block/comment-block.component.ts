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

	/**
	 * Display block comment in compact
	 */
	readonly compact = input(false, { transform: booleanAttribute });

	/**
	 * Small is a shorthand to set the size to small
	 *
	 * If the size input is filled along with the small input, their values will have the priority
	 */
	readonly small = input(false, { transform: booleanAttribute });

	/**
	 * Set the block comment response
	 */
	readonly chatAnswer = input(false, { transform: booleanAttribute });

	/**
	 * Display author name
	 */
	readonly authorName = input<PortalContent>();

	/**
	 * Display avatar
	 */
	readonly avatar = input<TemplateRef<unknown>>();

	/**
	 * Which size should the block comment be? Defaults or small
	 */
	readonly size = input<'S' | 'M'>();

	readonly noAvatar = computed(() => !this.avatar());
	readonly isSingleComment = computed(() => this.comments().length === 1);
	readonly role = this.#chatBlock ? 'listitem' : null;
}

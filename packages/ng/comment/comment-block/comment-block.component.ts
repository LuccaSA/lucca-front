import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, forwardRef, HostBinding, inject, Input, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { CommentComponent } from '../comment/comment.component';
import { COMMENT_BLOCK_INSTANCE, COMMENT_CHAT_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment-block',
	standalone: true,
	imports: [NgTemplateOutlet],
	templateUrl: './comment-block.component.html',

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
	@Input({
		transform: booleanAttribute,
	})
	compact = false;

	@Input({
		transform: booleanAttribute,
	})
	small = false;

	@Input({
		transform: booleanAttribute,
	})
	chatAnswer = false;

	comments = contentChildren(CommentComponent, { read: CommentComponent, descendants: true });

	authorName = input<PortalContent>();

	avatar = input<TemplateRef<unknown>>();

	size = input<'S' | 'M'>();

	noAvatar = computed(() => {
		return !this.avatar();
	});

	isSingleComment = computed(() => {
		return this.comments().length === 1;
	});

	#chatBlock = inject(COMMENT_CHAT_INSTANCE, { optional: true });

	@HostBinding('attr.role')
	public role = this.#chatBlock ? 'listitem' : null;
}

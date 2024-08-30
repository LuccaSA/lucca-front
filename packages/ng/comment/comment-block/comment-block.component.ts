import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, forwardRef, HostBinding, Input, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { CommentComponent } from '../comment/comment.component';
import { COMMENT_BLOCK_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment-block',
	standalone: true,
	imports: [],
	templateUrl: './comment-block.component.html',
	styleUrl: './comment-block.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'commentWrapper',
	},
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
	@HostBinding('class.mod-compact')
	compact = false;

	@Input({
		transform: booleanAttribute,
	})
	@HostBinding('class.mod-S')
	small = false;

	comments = contentChildren(CommentComponent, { read: CommentComponent, descendants: true });

	authorName = input<PortalContent>();

	avatar = input<TemplateRef<unknown>>();

	noAvatar = computed(() => {
		return !this.avatar();
	});

	size = input<'S' | 'M'>();

	isSingleComment = computed(() => {
		return this.comments().length === 1;
	});

	protected role = computed(() => {
		return this.isSingleComment() ? null : 'list';
	});

	@HostBinding('attr.role')
	get roleAttr(): string {
		return this.role();
	}
}

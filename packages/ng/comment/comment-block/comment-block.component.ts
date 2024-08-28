import { ChangeDetectionStrategy, Component, computed, contentChildren, forwardRef, HostBinding, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { COMMENT_BLOCK_INSTANCE } from '../token';
import { CommentComponent } from '../comment/comment.component';

@Component({
	selector: 'lu-comment-block',
	standalone: true,
	imports: [],
	templateUrl: './comment-block.component.html',
	styleUrl: './comment-block.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'commentWrapper mod-compact',
	},
	providers: [
		{
			provide: COMMENT_BLOCK_INSTANCE,
			useExisting: forwardRef(() => CommentBlockComponent),
		},
	],
})
export class CommentBlockComponent {
	comments = contentChildren(CommentComponent, { read: CommentComponent, descendants: true });

	authorName = input<PortalContent>();

	avatar = viewChild<TemplateRef<unknown>>('avatarTpl');

	noAvatar = computed(() => {
		return !this.avatar();
	});

	size = input<'S' | 'M'>();

	isSingleComment = computed(() => {
		return this.comments().length === 1;
	});

	protected role = computed(() => {
		return this.isSingleComment() ? 'presentation' : 'list';
	});

	@HostBinding('attr.role')
	get roleAttr(): string {
		return this.role();
	}
}

import { ChangeDetectionStrategy, Component, computed, HostBinding, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { COMMENT_BLOCK_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment',
	standalone: true,
	imports: [PortalDirective, DatePipe, LuUserPictureModule, NgTemplateOutlet],
	templateUrl: './comment.component.html',
	styleUrl: './comment.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'commentWrapper-item mod-WrapperAvatar',
	},
})
export class CommentComponent {
	#locale = inject(LOCALE_ID);
	#intlDateTimeFormat = new Intl.DateTimeFormat(this.#locale, {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	#parentBlock = inject(COMMENT_BLOCK_INSTANCE);

	noAvatar = computed(() => this.#parentBlock.noAvatar());

	avatar = computed(() => this.#parentBlock.avatar());

	authorName = computed(() => this.#parentBlock.authorName());

	size = computed(() => this.#parentBlock.size());

	date = input<Date>();

	dateDisplay = computed(() => {
		const formatted = this.#intlDateTimeFormat.format(this.date());
		return `${formatted[0].toUpperCase()}${formatted.slice(1)}`;
	});

	isFirstComment = computed(() => this.#parentBlock.comments()[0] === this);

	role = computed(() => {
		return this.#parentBlock.isSingleComment() ? '' : 'listitem';
	});

	@HostBinding('attr.role')
	get roleAttr(): string {
		return this.role();
	}
}

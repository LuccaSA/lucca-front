import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostBinding, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { COMMENT_BLOCK_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment',
	standalone: true,
	imports: [PortalDirective, DatePipe, LuUserPictureModule, NgTemplateOutlet],
	templateUrl: './comment.component.html',
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

	content = input<string>();

	contentIsHTML = computed(() => {
		return /<\/?[a-z][\s\S]*>/i.test(this.content());
	});

	dateDisplay = computed(() => {
		const formatted = this.#intlDateTimeFormat.format(this.date());
		return `${formatted[0].toUpperCase()}${formatted.slice(1)}`;
	});

	role = computed(() => {
		return this.#parentBlock.isSingleComment() ? null : 'listitem';
	});

	@HostBinding('attr.role')
	get roleAttr(): string {
		return this.role();
	}
}

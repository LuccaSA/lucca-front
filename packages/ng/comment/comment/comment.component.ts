import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { COMMENT_BLOCK_INSTANCE } from '../token';

@Component({
	selector: 'lu-comment',
	imports: [PortalDirective, DatePipe, LuUserPictureModule, NgTemplateOutlet],
	templateUrl: './comment.component.html',
	styleUrl: './comment.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'commentWrapper-item',
		'[attr.role]': 'role()',
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

	/**
	 * Comment content
	 */
	readonly content = input<string>();

	/**
	 * Add a date to the comment
	 */
	readonly date = input<Date>();

	/**
	 * format given to the date pipe for display.
	 *
	 * See https://angular.dev/api/common/DatePipe#custom-format-options
	 */
	readonly datePipeFormat = input<string | undefined>(undefined);

	readonly noAvatar = computed(() => this.#parentBlock.noAvatar());

	readonly avatar = computed(() => this.#parentBlock.avatar());

	readonly authorName = computed(() => this.#parentBlock.authorName());

	readonly size = computed(() => this.#parentBlock.size());

	readonly contentIsHTML = computed(() => /<\/?[a-z][\s\S]*>/i.test(this.content()));

	readonly dateDisplay = computed(() => {
		const formatted = this.#intlDateTimeFormat.format(this.date());
		return `${formatted[0].toUpperCase()}${formatted.slice(1)}`;
	});

	readonly role = computed(() => (this.#parentBlock.isSingleComment() ? null : 'listitem'));

	get roleAttr(): string {
		return this.role();
	}
}

import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { ILuUser, LuUserPictureComponent } from '@lucca-front/ng/user';

@Component({
	selector: 'lu-activity-feed-step',
	templateUrl: './activity-feed-step.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuUserPictureComponent, DatePipe, PortalDirective],
	host: {
		role: 'listitem',
		class: 'activityFeed-step',
	},
})
export class ActivityFeedStepComponent {
	#locale = inject(LOCALE_ID);
	#intlDateTimeFormat = new Intl.DateTimeFormat(this.#locale, {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	readonly label = input.required<string>();

	readonly user = input.required<ILuUser>();

	readonly date = input<Date>();

	/**
	 * format given to the date pipe for display.
	 *
	 * See https://angular.dev/api/common/DatePipe#custom-format-options
	 */
	readonly datePipeFormat = input<string>();

	protected readonly dateDisplay = computed<string>(() => {
		const formatted = this.#intlDateTimeFormat.format(this.date());
		return `${formatted[0].toUpperCase()}${formatted.slice(1)}`;
	});
}

import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, PortalDirective } from '@lucca-front/ng/core';
import { ILuUser, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LU_ACTIVITY_FEED_TRANSLATIONS } from '../activity-feed.translate';

@Component({
	selector: 'lu-activity-feed-step',
	templateUrl: './activity-feed-step.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuUserPictureComponent, DatePipe, PortalDirective],
	host: {
		role: 'listitem',
		class: 'activityFeed-step',
		'[class.mod-pending]': 'status() === "pending"',
	},
})
export class ActivityFeedStepComponent {
	readonly intl = input(...intlInputOptions(LU_ACTIVITY_FEED_TRANSLATIONS));
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

	readonly user = input<ILuUser | null>(null);

	readonly status = input<'success' | 'critical' | 'pending' | null>(null);

	readonly date = input<Date | null>(null);

	/**
	 * format given to the date pipe for display.
	 *
	 * See https://angular.dev/api/common/DatePipe#custom-format-options
	 */
	readonly datePipeFormat = input<string>();

	protected readonly dateDisplay = computed<string | null>(() => {
		if (!this.date()) {
			return null;
		}
		const formatted = this.#intlDateTimeFormat.format(this.date());
		const parts = formatted.split(', ');
		return `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} ${this.intl().at} ${parts[1]}`;
	});
}

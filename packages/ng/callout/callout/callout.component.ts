import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { getIntl, Palette } from '@lucca-front/ng/core';
import { LU_CALLOUT_TRANSLATIONS } from '../callout.translate';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-callout',
	standalone: true,
	imports: [NgIf],
	templateUrl: './callout.component.html',
	styleUrls: ['./callout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {
	@Input()
	/**
	 * The title of the callout
	 */
	heading: string;

	@Input()
	/**
	 * Which palette should be used for the entire callout.
	 * Defaults to none (inherits parent palette)
	 */
	palette: Palette = 'none';

	@Input()
	/**
	 * Which size should the callout be? Defaults to medium
	 */
	size: 'M' | 'S';

	@Input()
	/**
	 * Should we display the remove icon?
	 */
	removable = false;

	@Input()
	/**
	 * Which icon should we display in the callout if any?
	 * Defaults to no icon.
	 */
	icon: LuccaIcon;

	@Input({ transform: booleanAttribute })
	/**
	 * Is the callout removed? Works with two way binding too.
	 */
	removed = false;

	@Output()
	removedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	public intl = getIntl(LU_CALLOUT_TRANSLATIONS);
}

import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getIntl, Palette } from '@lucca-front/ng/core';
import { LU_CALLOUT_TRANSLATIONS } from './callout.translate';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-callout',
	standalone: true,
	imports: [CommonModule],
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
	 *
	 * IMPORTANT: the callout won't hide itself, you're responsible for removing
	 * it using *ngIf as you might want to store the information that it has been
	 * hidden. Hook on the `hidden` event emitter for that.
	 */
	removable = false;

	@Input()
	/**
	 * Which icon should we display in the callout if any?
	 * Defaults to no icon.
	 */
	icon: LuccaIcon;

	@Input()
	/**
	 * Should we use tiny mode?
	 * WARNING: tiny mode should only be used without a title, there's no runtime
	 * check for this for performance reasons but make sure to never have both title
	 * and tiny.
	 */
	tiny: boolean;

	@Input({ transform: booleanAttribute })
	/**
	 * Is the callout removed? Works with two way binding too.
	 *
	 */
	removed = false;

	@Output()
	removedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	public intl = getIntl(LU_CALLOUT_TRANSLATIONS);
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject, ViewEncapsulation } from '@angular/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat } from '../display/index';
import { displayPictureFormatRecord } from '../picture/user-picture.component';

export interface LuUserTileUserInput {
	picture?: { href: string } | null;
	pictureHref?: string | null;
	firstName: string;
	lastName: string;
	jobTitle?: string | null;
}

/**
 * Displays user picture and name. LuUserTileUserInput's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'userTile' },
	encapsulation: ViewEncapsulation.None,
})
export class LuUserTileComponent {
	readonly #defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);
	readonly #changeDetector = inject(ChangeDetectorRef);
	displayPictureFormat = displayPictureFormatRecord[this.#defaultFormat];

	private _user: LuUserTileUserInput;
	/**
	 * LuUserTileUserInput to display.
	 */
	@Input()
	set user(user: LuUserTileUserInput) {
		this._user = user;
		this.#changeDetector.markForCheck();
	}

	get user(): LuUserTileUserInput {
		return this._user;
	}

	private _displayFormat: LuDisplayFormat;
	/**
	 * User Display format.
	 * It is set to 'LU_DEFAULT_DISPLAY_POLICY' by default
	 */
	@Input()
	set displayFormat(displayFormat: LuDisplayFormat) {
		this._displayFormat = displayFormat;
		this.displayPictureFormat = displayPictureFormatRecord[displayFormat];
		this.#changeDetector.markForCheck();
	}
	get displayFormat(): LuDisplayFormat {
		return this._displayFormat;
	}

	private _role: string;
	/**
	 * LuUserTileUserInput role to display
	 */
	@Input()
	set role(role: string) {
		this._role = role;
		this.#changeDetector.markForCheck();
	}

	get role(): string {
		return this._role;
	}
}

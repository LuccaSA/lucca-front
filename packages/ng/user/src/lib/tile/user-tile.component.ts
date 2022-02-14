import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials } from '../display/index';
import { ILuUser } from '../user.model';

/**
 * Displays user picture and name. ILuUser's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuUserTileComponent {
	private _user: ILuUser;
	/**
	 * ILuUser to display.
	 */
	@Input()
	set user(user: ILuUser) {
		this._user = user;
		this._changeDetector.markForCheck();
	}

	get user(): ILuUser {
		return this._user;
	}

	/**
	 * User Display format.
	 * It is set to 'lf' by default
	 */
	@Input()
	displayFormat: LuDisplayFormat;

	private _role: string;
	/**
	 * ILuUser role to display
	 */
	@Input()
	set role(role: string) {
		this._role = role;
		this._changeDetector.markForCheck();
	}

	get role(): string {
		return this._role;
	}

	get displayPictureFormat(): LuDisplayInitials {
		switch (this.displayFormat) {
			case LuDisplayFullname.lastfirst:
			case LuDisplayInitials.lastfirst:
			case LuDisplayHybrid.lastIfirstFull:
			case LuDisplayHybrid.lastFullfirstI:
				return LuDisplayInitials.lastfirst;
			case LuDisplayFullname.last:
			case LuDisplayInitials.last:
				return LuDisplayInitials.last;
			case LuDisplayFullname.first:
			case LuDisplayInitials.first:
				return LuDisplayInitials.first;
			case LuDisplayFullname.firstlast:
			case LuDisplayInitials.firstlast:
			case LuDisplayHybrid.firstIlastFull:
			case LuDisplayHybrid.firstFulllastI:
			default:
				return LuDisplayInitials.firstlast;
		}
	}

	constructor(private _changeDetector: ChangeDetectorRef) {}
}

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IUser } from '../index';
import {
	LuUserDisplayPipe,
	DisplayInitials,
	DisplayFullname,
	DisplayHybrid,
} from '../display';

/**
 * Displays user picture and name. IUser's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuUserTileComponent {

	private _user: IUser;
	/**
	 * IUser to display.
	 */
	@Input()
	set user(user: IUser) {
		this._user = user;
		this._changeDetector.markForCheck();
	}

	get user(): IUser {
		return this._user;
	}

	private _displayFormat = 'lf';
	/**
	 * User Display format.
	 * It is set to 'fl' by default
	 */
	@Input()
	set displayFormat(displayFormat: string) {
		this._displayFormat = displayFormat;
		this._changeDetector.markForCheck();
	}

	get displayFormat(): string {
		return this._displayFormat;
	}

	private _role: string;
	/**
	 * IUser role to display
	 */
	@Input()
	set role(role: string) {
		this._role = role;
		this._changeDetector.markForCheck();
	}

	get role(): string {
		return this._role;
	}

	get displayPictureFormat(): DisplayInitials {
		switch (this.displayFormat) {
			case DisplayFullname.lastfirst:
			case DisplayInitials.lastfirst:
			case DisplayHybrid.lastIfirstFull:
			case DisplayHybrid.lastFullfirstI:
				return DisplayInitials.lastfirst;
			case DisplayFullname.last:
			case DisplayInitials.last:
				return DisplayInitials.last;
			case DisplayFullname.first:
			case DisplayInitials.first:
				return DisplayInitials.first;
			case DisplayFullname.firstlast:
			case DisplayInitials.firstlast:
			case DisplayHybrid.firstIlastFull:
			case DisplayHybrid.firstFulllastI:
			default:
				return DisplayInitials.firstlast;
		}
	}

	constructor(
		private _changeDetector: ChangeDetectorRef
	) {}
}

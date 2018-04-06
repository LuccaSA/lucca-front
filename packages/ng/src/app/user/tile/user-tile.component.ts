import { Component, Input } from '@angular/core';
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
})
export class LuUserTileComponent {
	/**
	 * IUser to display.
	 */
	@Input() user: IUser;

	/**
	 * User Display format.
	 * It is set to 'fl' by default
	 */
	@Input() displayFormat = 'fl';

	/**
	 * IUser role to display
	 */
	@Input() role: string;

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

	constructor() {}
}

import {Component, Input} from '@angular/core';
import {IUser} from '../index';
import { LuUserDisplayPipe } from '../display';

/**
 * Displays user picture and name. IUser's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss']
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

	constructor() {	}
}

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
	 * IUser role to display
	 */
	@Input() role: string;

	/**
	 * User-picture size in px
	 */
	@Input() imageSize: number;

	constructor(private displayPipe: LuUserDisplayPipe) {	}
}

import {Component, Input, OnInit} from '@angular/core';
import {User} from './user-tile.models';

/**
 * Displays user picture and name. User's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss']
})
export class LuUserTileComponent implements OnInit {

	/**
	 * User to display.
	 */
	@Input() user: User;

	/**
	 * User role to display
	 */
	@Input() role: string;

	constructor() { }

	ngOnInit() {
	}

}

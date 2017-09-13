import {Component, Input} from '@angular/core';
import {User} from './user-tile.models';

/**
 * Displays user picture and name. User's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss']
})
export class LuUserTileComponent {

	/**
	 * User to display.
	 */
	@Input() user: User;

	/**
	 * User role to display
	 */
	@Input() role: string;

	get displayName() {
		return `${this.user.firstName} ${this.user.lastName}`
	}

	get pictureTextPlaceholder () {
		return this.getUserNamesListUpperCase().map(str => str[0]).join('');
	}

	hasUserPicture = () => !!this.user.picture && !!this.user.picture.url;

	getBackgroundImageStyle = () => ({'background-image': `url('${this.user.picture.url}?width=100)`});

	getDefaultColorStyle = () => ({'background-color': `hsl(${this.getNameHue()}, 60%, 60%)`});

	private getNameHue = () => this.getUserNamesListUpperCase().map(str => str.charCodeAt(0)).reduce((sum, a) => sum + a, 0) * 2 % 360;

	private getUserNamesListUpperCase = () => [this.user.firstName.toUpperCase(), this.user.lastName.toUpperCase()];
}

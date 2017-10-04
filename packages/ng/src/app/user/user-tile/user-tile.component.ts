import {Component, Input} from '@angular/core';
import {IUser} from '../index';

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

	get displayName() {
		return `${this.user.firstName} ${this.user.lastName}`
	}

	get pictureTextPlaceholder () {
		return this.getUserNamesListUpperCase().map(str => str[0]).join('');
	}

	hasUserPicture = () => !!this.user.picture && !!this.user.picture.url;

	getBackgroundImageStyle = () => ({'background-image': `url('${this.user.picture.url}?width=100)`});

	getDefaultColorStyle = () => ({'background-color': `hsl(${this.getNameHue()}, 60%, 60%)`});

	private getNameHue() {
		const initialsAsciiCodes = this.getUserNamesListUpperCase().map(str => str.charCodeAt(0));
		const averageOfAsciiCodes = initialsAsciiCodes
			.reduce((sum, a) => sum + a, 0) / initialsAsciiCodes.length; // between 65 and 90, see ascii codes for capitals
		const asciiCodeToHue = (averageOfAsciiCodes - 64) * 360 / 26 % 360; // between 0 and 359, see documentation for css hsl
	return asciiCodeToHue;
}

	private getUserNamesListUpperCase = () => [this.user.firstName.toUpperCase(), this.user.lastName.toUpperCase()];
}

import { Component, Input } from '@angular/core';
import { IUser } from '../user.model';
import { LuUserDisplayPipe } from '../display';

/**
 * Displays user'picture or a placeholder with his/her initials and random bg color'
 */
@Component({
	selector: 'lu-user-picture',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	moduleId: module.id,
})
export class LuUserPictureComponent {

	/**
	 * IUser whose picture you wanna display.
	 */
	@Input() user: IUser;

	get pictureTextPlaceholder () {
		return this.displayPipe.transform(this.user, 'LF');
	}

	hasUserPicture = () => !!this.user.picture && !!this.user.picture.url;

	getBackgroundImageStyle = () => ({'background-image': `url('${this.user.picture.url}?width=100)`});

	getDefaultColorStyle = () => ({'background-color': `hsl(${this.getNameHue()}, 60%, 60%)`});

	constructor(private displayPipe: LuUserDisplayPipe) {	}

	private getNameHue() {
		const initialsAsciiCodes = this.getUserNamesListUpperCase().map(str => str.charCodeAt(0));
		const averageOfAsciiCodes = initialsAsciiCodes
			.reduce((sum, a) => sum + a, 0) / initialsAsciiCodes.length; // between 65 and 90, see ascii codes for capitals
		const asciiCodeToHue = (averageOfAsciiCodes - 64) * 360 / 26 % 360; // between 0 and 359, see documentation for css hsl
		return asciiCodeToHue;
	}

	private getUserNamesListUpperCase = () => [this.user.firstName.toUpperCase(), this.user.lastName.toUpperCase()];
}

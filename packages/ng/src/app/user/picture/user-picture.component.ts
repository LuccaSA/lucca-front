import { Component, Input, HostBinding } from '@angular/core';
import { IUser } from '../user.model';
import { LuUserDisplayPipe } from '../display';

/**
 * Displays user'picture or a placeholder with his/her initials and random bg color'
 */
@Component({
	selector: 'lu-user-picture',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
})
export class LuUserPictureComponent {
	/**
		 * User Display format.
		 * It is set to 'fl' by default
		 */
	private _displayFormat = 'FL';
	@Input()
	set displayFormat(displayFormat: string) {
		this._displayFormat = displayFormat.toUpperCase();
	}
	get displayFormat(): string { return this._displayFormat; }
	/**
	 * IUser whose picture you wanna display.
	 */
	private _user: IUser;

	@Input() set user(user: IUser) {
		this._user = user;
		this.initials = this.displayPipe.transform(user, this._displayFormat);
		this.hasPicture = !!user.picture && !!user.picture.href;
		if (this.hasPicture) {
			this.style = { 'background-image': `url('${this._user.picture.href}')` };
		} else {
			const hsl = this.getNameHue();
			this.style = { 'background-color': `hsl(${hsl}, 60%, 60%)` };
		}
	}
	get user() { return this._user; }

	initials = '';
	hasPicture = false;

	style;

	constructor(private displayPipe: LuUserDisplayPipe) {	}

	private getNameHue() {
		// we sum the chars in user's firstname + lastname
		const charSum = this.displayPipe.transform(this._user, 'fl')
		.split('')
		.reduce((sum, a) => sum + a.charCodeAt(0), 0);
		// and take a modulo 360 for hue
		const hue = charSum % 360;
		return hue;
	}
}

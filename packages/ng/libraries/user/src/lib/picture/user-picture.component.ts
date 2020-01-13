import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';
import { ILuUser } from '../user.model';
import {
	LuUserDisplayPipe,
	LuDisplayFormat,
	LuDisplayInitials,
	LuDisplayFullname,
} from '../display/index';

/**
 * Displays user'picture or a placeholder with his/her initials and random bg color'
 */
@Component({
	selector: 'lu-user-picture',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuUserPictureComponent {

	private _displayFormat: LuDisplayInitials = LuDisplayInitials.lastfirst;
	/**
	 * User Display format.
	 * It is set to 'FL' by default
	 */
	@Input()
	set displayFormat(displayFormat: LuDisplayInitials) {
		this._displayFormat = displayFormat;
		this._changeDetector.markForCheck();
	}

	get displayFormat(): LuDisplayInitials {
		return this._displayFormat;
	}

	/**
	 * ILuUser whose picture you wanna display.
	 */
	private _user: ILuUser;

	@Input()
	set user(user: ILuUser) {
		this._user = user;
		this.initials = this.displayPipe.transform(user, this.displayFormat);
		this.hasPicture = !!user && !!user.picture && !!user.picture.href;
		if (this.hasPicture) {
			this.style = { 'background-image': `url('${this._user.picture.href}')` };
		} else {
			const hsl = this.getNameHue();
			this.style = { 'background-color': `hsl(${hsl}, 60%, 60%)` };
		}
		this._changeDetector.markForCheck();
	}
	get user() {
		return this._user;
	}

	initials = '';
	hasPicture = false;

	style;

	constructor(
		private displayPipe: LuUserDisplayPipe,
		private _changeDetector: ChangeDetectorRef
	) {}

	private getNameHue(): number {
		// we sum the chars in user's firstname + lastname
		const charSum = this.displayPipe
			.transform(this._user, LuDisplayFullname.firstlast)
			.split('')
			.reduce((sum, a) => sum + a.charCodeAt(0), 0);
		// and take a modulo 360 for hue
		const hue = charSum % 360;
		return hue;
	}
}

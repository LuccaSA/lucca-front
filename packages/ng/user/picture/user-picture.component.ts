import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional } from '@angular/core';
import { LuDisplayFullname, LuDisplayInitials, LuUserDisplayPipe } from '../display';
import { ILuUser } from '../user.model';

/**
 * Displays user's picture or a placeholder with his/her initials and random bg color'
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
	 * It is set to 'LF' by default
	 */
	@Input()
	@Optional()
	set displayFormat(displayFormat: LuDisplayInitials) {
		this._displayFormat = displayFormat;
		this._changeDetector.markForCheck();
	}

	get displayFormat(): LuDisplayInitials {
		return this._displayFormat;
	}

	/**
	 * ILuUser whose picture you want to display.
	 */
	private _user: ILuUser;

	@Input()
	set user(user: ILuUser) {
		this._user = user;
		this.initials = this.displayPipe.transform(user, this.displayFormat);
		const pictureHref = user?.picture?.href || user?.pictureHref;
		this.hasPicture = !!pictureHref;
		this.pictureHref = pictureHref;
		if (!this.hasPicture) {
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
	pictureHref = '';

	style = {};

	constructor(private displayPipe: LuUserDisplayPipe, private _changeDetector: ChangeDetectorRef) {}

	pictureError() {
		this.hasPicture = false;
		const hsl = this.getNameHue();
		this.style = { 'background-color': `hsl(${hsl}, 60%, 60%)` };
	}

	private getNameHue(): number {
		// we sum the chars in user's firstname + lastname
		const charSum = this.displayPipe
			.transform(this._user, LuDisplayFullname.firstlast)
			.split('')
			.reduce((sum, a) => sum + a.charCodeAt(0), 0);
		// and take a modulo 360 for hue
		return charSum % 360;
	}
}

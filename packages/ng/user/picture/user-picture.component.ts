import { ChangeDetectionStrategy, Component, Input, OnChanges, Optional, inject } from '@angular/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, luUserDisplay } from '../display';

export interface LuUserPictureUserInput {
	picture?: { href: string } | null;
	pictureHref?: string | null;
	firstName: string;
	lastName: string;
}

export const displayPictureFormatRecord: Record<LuDisplayFormat, LuDisplayInitials> = {
	[LuDisplayFullname.lastfirst]: LuDisplayInitials.lastfirst,
	[LuDisplayInitials.lastfirst]: LuDisplayInitials.lastfirst,
	[LuDisplayHybrid.lastIfirstFull]: LuDisplayInitials.lastfirst,
	[LuDisplayHybrid.lastFullfirstI]: LuDisplayInitials.lastfirst,

	[LuDisplayFullname.last]: LuDisplayInitials.last,
	[LuDisplayInitials.last]: LuDisplayInitials.last,

	[LuDisplayFullname.first]: LuDisplayInitials.first,
	[LuDisplayInitials.first]: LuDisplayInitials.first,

	[LuDisplayFullname.firstlast]: LuDisplayInitials.firstlast,
	[LuDisplayInitials.firstlast]: LuDisplayInitials.firstlast,
	[LuDisplayHybrid.firstIlastFull]: LuDisplayInitials.firstlast,
	[LuDisplayHybrid.firstFulllastI]: LuDisplayInitials.firstlast,
};

/**
 * Displays user's picture or a placeholder with his/her initials and random bg color'
 */
@Component({
	selector: 'lu-user-picture',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuUserPictureComponent implements OnChanges {
	/**
	 * User Display format.
	 * It is set to 'LU_DEFAULT_DISPLAY_POLICY' by default
	 */
	@Input()
	@Optional()
	displayFormat: LuDisplayInitials = displayPictureFormatRecord[inject(LU_DEFAULT_DISPLAY_POLICY)];

	/**
	 * Image loading attribute
	 * It is set to 'lazy' by default
	 *
	 * (more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)
	 */
	@Input()
	imageLoadingAttribute: HTMLImageElement['loading'] = 'lazy';

	/**
	 * UserPictureUserInput whose picture you want to display.
	 */
	private _user: LuUserPictureUserInput;

	@Input()
	set user(user: LuUserPictureUserInput) {
		this._user = user;
		const pictureHref = user?.picture?.href || user?.pictureHref;
		this.hasPicture = !!pictureHref;
		this.pictureHref = pictureHref;
		if (!this.hasPicture) {
			const hsl = this.getNameHue();
			this.style = { 'background-color': `hsl(${hsl}, 60%, 60%)` };
		}
	}

	get user() {
		return this._user;
	}

	initials = '';
	hasPicture = false;
	pictureHref = '';

	style = {};

	ngOnChanges(): void {
		this.initials = luUserDisplay(this.user, this.displayFormat);
	}

	pictureError() {
		this.hasPicture = false;
		const hsl = this.getNameHue();
		this.style = { 'background-color': `hsl(${hsl}, 60%, 60%)` };
	}

	private getNameHue(): number {
		// we sum the chars in user's firstname + lastname
		const charSum = luUserDisplay(this._user, LuDisplayFullname.firstlast)
			.split('')
			.reduce((sum, a) => sum + a.charCodeAt(0), 0);
		// and take a modulo 360 for hue
		return charSum % 360;
	}
}

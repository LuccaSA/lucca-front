import { NgStyle } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, ViewEncapsulation } from '@angular/core';
import { isNotNilOrEmptyString } from '@lucca-front/ng/core';
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
	imports: [NgStyle],
	templateUrl: './user-picture.component.html',
	styleUrl: './user-picture.component.scss',
	host: {
		class: 'avatar',
		'[class.mod-AI]': 'AI()',
		'[class.mod-XS]': 'size() === "XS"',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-M]': 'size() === "M"',
		'[class.mod-L]': 'size() === "L"',
		'[class.mod-XL]': 'size() === "XL"',
		'[class.mod-XXL]': 'size() === "XXL"',
		'[class.mod-XXXL]': 'size() === "XXXL"',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class LuUserPictureComponent {
	/**
	 * User Display format.
	 * It is set to 'LU_DEFAULT_DISPLAY_POLICY' by default
	 */
	readonly displayFormat = input<LuDisplayInitials>(displayPictureFormatRecord[inject(LU_DEFAULT_DISPLAY_POLICY)]);

	readonly user = input<LuUserPictureUserInput>();

	readonly AI = input(false, { transform: booleanAttribute });

	readonly size = input<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>('M');

	/**
	 * Image loading attribute
	 * It is set to 'lazy' by default
	 *
	 * (more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)
	 */
	readonly imageLoadingAttribute = input<HTMLImageElement['loading']>('lazy');

	readonly initials = computed(() => luUserDisplay(this.user(), this.displayFormat()));
	readonly modSize = computed(() => `mod-${this.size()}`);
	readonly hasPicture = linkedSignal(() => isNotNilOrEmptyString(this.pictureHref()));
	readonly pictureHref = computed(() => {
		const user = this.user();
		if (user) {
			return user?.picture?.href || user?.pictureHref;
		}
		return null;
	});
	readonly style = linkedSignal(() => {
		if (!this.hasPicture()) {
			const hsl = this.#getNameHue();
			return { 'background-color': `hsl(${hsl}, 60%, 60%)` };
		}
		return {};
	});
	readonly #getNameHue = computed(() => {
		// we sum the chars in user's firstname + lastname
		const charSum = luUserDisplay(this.user(), LuDisplayFullname.firstlast)
			.split('')
			.reduce((sum, a) => sum + a.charCodeAt(0), 0);
		// and take a modulo 360 for hue
		return charSum % 360;
	});

	pictureError() {
		this.hasPicture.set(false);
		const hsl = this.#getNameHue();
		this.style.set({ 'background-color': `hsl(${hsl}, 60%, 60%)` });
	}
}

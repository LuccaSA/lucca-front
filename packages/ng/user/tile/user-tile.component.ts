import { ChangeDetectionStrategy, Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFormat, LuUserDisplayPipe } from '../display/index';
import { displayPictureFormatRecord, LuUserPictureComponent } from '../picture/user-picture.component';

export interface LuUserTileUserInput {
	picture?: { href: string } | null;
	pictureHref?: string | null;
	firstName: string;
	lastName: string;
	jobTitle?: string | null;
}

/**
 * Displays user picture and name. LuUserTileUserInput's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	imports: [LuUserDisplayPipe, LuUserPictureComponent],
	templateUrl: './user-tile.component.html',
	styleUrl: './user-tile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'userTile' },
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
})
export class LuUserTileComponent {
	#luClass = inject(LuClass);
	readonly #defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);

	/**
	 * LuUserTileUserInput to display.
	 */
	readonly user = input<LuUserTileUserInput>();

	/**
	 * User Display format.
	 * It is set to 'LU_DEFAULT_DISPLAY_POLICY' by default
	 */
	readonly displayFormat = input<LuDisplayFormat>();

	/**
	 * LuUserTileUserInput role to display
	 */
	readonly role = input<string>();

	/**
	 * Which size should the user tile be? Defaults to medium
	 */
	readonly size = input<'L' | 'M' | 'S' | 'XS'>();

	readonly displayPictureFormat = computed(() => (this.displayFormat() ? displayPictureFormatRecord[this.displayFormat()] : displayPictureFormatRecord[this.#defaultFormat]));

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
			});
		});
	}
}

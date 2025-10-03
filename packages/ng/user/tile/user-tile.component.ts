import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, Input, ViewEncapsulation } from '@angular/core';
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
	standalone: true,
})
export class LuUserTileComponent {
	#luClass = inject(LuClass);
	readonly #defaultFormat = inject(LU_DEFAULT_DISPLAY_POLICY);
	readonly #changeDetector = inject(ChangeDetectorRef);
	displayPictureFormat = displayPictureFormatRecord[this.#defaultFormat];

	private _user: LuUserTileUserInput;
	/**
	 * LuUserTileUserInput to display.
	 */
	@Input()
	set user(user: LuUserTileUserInput) {
		this._user = user;
		this.#changeDetector.markForCheck();
	}

	get user(): LuUserTileUserInput {
		return this._user;
	}

	private _displayFormat: LuDisplayFormat;
	/**
	 * User Display format.
	 * It is set to 'LU_DEFAULT_DISPLAY_POLICY' by default
	 */
	@Input()
	set displayFormat(displayFormat: LuDisplayFormat) {
		this._displayFormat = displayFormat;
		this.displayPictureFormat = displayPictureFormatRecord[displayFormat];
		this.#changeDetector.markForCheck();
	}
	get displayFormat(): LuDisplayFormat {
		return this._displayFormat;
	}

	private _role: string;
	/**
	 * LuUserTileUserInput role to display
	 */
	@Input()
	set role(role: string) {
		this._role = role;
		this.#changeDetector.markForCheck();
	}

	get role(): string {
		return this._role;
	}

	/**
	 * Which size should the user tile be? Defaults to medium
	 */
	size = input<'L' | 'M' | 'S' | 'XS'>();

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
			});
		});
	}
}

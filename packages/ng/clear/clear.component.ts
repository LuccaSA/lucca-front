import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	contentChildren,
	effect,
	ElementRef,
	EventEmitter,
	forwardRef,
	inject,
	input,
	Output,
	untracked,
	ViewEncapsulation,
} from '@angular/core';
import { intlInputOptions, LuClass, Palette } from '@lucca-front/ng/core';
import { ALuClear, ILuClear } from './clear.model';
import { LU_CLEAR_TRANSLATIONS } from './clear.translate';

@Component({
	selector: 'lu-clear',
	styleUrl: './clear.component.scss',
	templateUrl: './clear.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'luClearer',
	host: {
		role: 'button',
		class: 'clear',
		'[attr.tabindex]': 'disabled() ? null : "0"',
		'[attr.disabled]': 'disabled() ? "disabled" : null',
		'[class.mod-S]': 'size() === "S"',
		'[class.palette-product]': 'palette() === "product"',
		'[class.mod-inverted]': 'inverted()',
		'(click)': 'clear($event)',
		'(keyup.space)': 'clear($event)',
		'(keydown.enter)': '$event.preventDefault(); $event.stopPropagation(); clear($event)',
		'(keydown.space)': '$event.preventDefault(); $event.stopPropagation()',
	},
	providers: [
		{
			provide: ALuClear,
			useExisting: forwardRef(() => ClearComponent),
		},
		LuClass,
	],
})
export class ClearComponent<T> extends ALuClear<T> implements ILuClear<T> {
	#luClass = inject(LuClass);
	readonly intl = input(...intlInputOptions(LU_CLEAR_TRANSLATIONS));

	/**
	 * Which size should the clear be? Defaults to small
	 */
	readonly size = input<'S' | null>(null);

	/**
	 * Disabled the clear
	 */
	readonly disabled = input(false, { transform: booleanAttribute });

	/**
	 * Which palette should be used for the entire clear
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Change the clear colors for use on a dark background
	 */
	readonly inverted = input(false, { transform: booleanAttribute });

	/**
	 * Emit event when button clear is click
	 */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() override onClear = new EventEmitter<T>();

	contentRef = contentChildren<ElementRef>('content');

	constructor() {
		super();
		effect(() => {
			const palette = this.palette();
			untracked(() => {
				if (palette !== 'none') {
					this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette() });
				}
			});
		});
	}

	clear($event: Event) {
		$event.preventDefault();
		$event.stopPropagation();

		this.onClear.emit();
	}
}

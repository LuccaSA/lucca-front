/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Overlay } from '@angular/cdk/overlay';
import {
	afterNextRender,
	AfterViewInit,
	booleanAttribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	contentChild,
	Directive,
	ElementRef,
	EventEmitter,
	forwardRef,
	inject,
	input,
	Injector,
	linkedSignal,
	OnDestroy,
	Renderer2,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ALuClear, ILuClear } from '@lucca-front/ng/clear';
import { isNotNil, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { ALuInputDisplayer, ILuInputDisplayer } from '@lucca-front/ng/input';
import { ALuPickerPanel, ILuPickerPanel } from '@lucca-front/ng/picker';
import { ALuSelectInput } from './select-input.model';

@Directive({
	host: {
		'[tabindex]': 'tabindex',
		'[class.is-disabled]': 'disabledInput()',
		'[class.is-focused]': 'isFocused',
		'[class.mod-multiple]': 'modMultiple',
		'[class.is-clearable]': 'isClearable',
		'(click)': 'onClick()',
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()',
		'(focus)': 'onFocus()',
		'(blur)': 'onBlur()',
		'(keydown.space)': 'onKeydown($event)',
		'(keydown.enter)': 'onKeydown($event)',
	},
})
export abstract class ALuSelectInputComponent<T, TPicker extends ILuPickerPanel<T> = ILuPickerPanel<T>> extends ALuSelectInput<T, TPicker> implements ControlValueAccessor, AfterViewInit, OnDestroy {
	private readonly _vcDisplayContainer = viewChild('display', { read: ViewContainerRef });

	tabindex = 0;

	readonly pickerOverlap = input(false, { transform: booleanAttribute });

	readonly placeholderInput = input<string>('', { alias: 'placeholder' });

	readonly multipleInput = input<boolean | string>(false, { alias: 'multiple' });

	readonly disabledInput = input<boolean>(false, { alias: 'disabled' });

	readonly pickerOverlapRef = linkedSignal(() => this.pickerOverlap());

	readonly onOpen = new EventEmitter<void>();
	readonly onClose = new EventEmitter<void>();

	/** Event emitted when the associated popover is opened. */
	protected readonly onOpenOutput = outputFromObservable(this.onOpen, { alias: 'onOpen' });
	/** Event emitted when the associated popover is closed. */
	protected readonly onCloseOutput = outputFromObservable(this.onClose, { alias: 'onClose' });

	readonly #injector = inject(Injector);

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);

		ɵeffectWithDeps([this.pickerOverlapRef], (pickerOverlap) => (this.target.overlap = pickerOverlap));
		ɵeffectWithDeps([this.placeholderInput], (placeholder) => {
			if (isNotNil(placeholder) && placeholder) {
				this._placeholder = placeholder;
			}
		});
		ɵeffectWithDeps([this.multipleInput], (multiple) => {
			if (multiple === '') {
				// allows to have multiple = true when writing
				// <lu-select multiple>
				this.multiple = true;
			} else {
				this.multiple = !!multiple;
			}
		});
		ɵeffectWithDeps([this.disabledInput], (disabled) => {
			this.setDisabledState(disabled);
		});
	}

	get isFocused() {
		return this._popoverOpen && !this.target.overlap;
	}

	get modMultiple() {
		return this._multiple;
	}

	get isClearable() {
		return !!this._clearer;
	}

	/**
	 * popover trigger class extension
	 */
	readonly ccPicker = contentChild(ALuPickerPanel);
	readonly vcPicker = viewChild(ALuPickerPanel);

	readonly ccDisplayer = contentChild<ILuInputDisplayer<T>>(ALuInputDisplayer);
	readonly vcDisplayer = viewChild<ILuInputDisplayer<T>>(ALuInputDisplayer);

	readonly ccClearer = contentChild<ILuClear<T>>(ALuClear);
	readonly vcClearer = viewChild<ILuClear<T>>(ALuClear);

	override onClick() {
		super.onClick();
	}

	override onMouseEnter() {
		super.onMouseEnter();
	}

	override onMouseLeave() {
		super.onMouseLeave();
	}

	override onFocus() {
		super.onFocus();
	}

	override onBlur() {
		super.onBlur();
	}

	onKeydown($event: Event) {
		if (!this._popoverOpen) {
			this.openPopover();
			$event.stopPropagation();
			$event.preventDefault();
		}
	}

	ngAfterViewInit() {
		this.displayContainer = this._vcDisplayContainer()!;
		this._isContentInitialized = true;

		// init picker and displayer and clearer
		const picker = this.ccPicker() || this.vcPicker();
		if (picker) {
			this._picker = picker as unknown as TPicker;
		}
		const displayer = this.ccDisplayer() || this.vcDisplayer();
		if (displayer) {
			this._displayer = displayer;
		}
		const clearer = this.ccClearer() || this.vcClearer();
		if (clearer) {
			this._clearer = clearer;
		}

		this.render();
		this._picker.setValue(this.value);

		afterNextRender(() => this._changeDetectorRef.markForCheck(), { injector: this.#injector });
	}

	ngOnDestroy() {
		if (this._popoverOpen) {
			this.closePopover();
		}
		this.destroyPopover();
		this.onDestroy();
	}

	protected _emitOpen(): void {
		this.onOpen.emit();
	}

	protected _emitClose(): void {
		this.onClose.emit();
	}
}

/**
 * select input
 *
 * @deprecated prefer SimpleSelect or MultipleSelect
 */
@Component({
	selector: 'lu-select',
	templateUrl: './select-input.component.html',
	styleUrl: './select-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.mod-multipleView]': 'modMultipleView',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelectInputComponent),
			multi: true,
		},
	],
})
export class LuSelectInputComponent<T> extends ALuSelectInputComponent<T> implements AfterViewInit {
	get modMultipleView() {
		return this.useMultipleViews();
	}

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}

	// display clearer
	readonly clearerEltRef = contentChild(ALuClear, { read: ElementRef });
	readonly suffixEltRef = viewChild('suffix', { read: ElementRef });

	displayClearer() {
		const clearerEl = this.clearerEltRef();
		if (clearerEl) {
			this._renderer.appendChild(this.suffixEltRef()!.nativeElement, clearerEl.nativeElement);
		}
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit();
		this.displayClearer(); // dont keep
	}
}

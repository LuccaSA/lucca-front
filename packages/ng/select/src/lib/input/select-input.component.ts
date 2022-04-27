/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Overlay } from '@angular/cdk/overlay';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	Directive,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	Output,
	Renderer2,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ALuClearer, ALuInputDisplayer, ILuClearer, ILuInputDisplayer } from '@lucca-front/ng/input';
import { ALuPickerPanel, ILuPickerPanel } from '@lucca-front/ng/picker';
import { ALuSelectInput } from './select-input.model';

@Directive()
export abstract class ALuSelectInputComponent<T, TPicker extends ILuPickerPanel<T> = ILuPickerPanel<T>> extends ALuSelectInput<T, TPicker> implements ControlValueAccessor, AfterViewInit, OnDestroy {
	@ViewChild('display', { read: ViewContainerRef, static: true })
	protected set _vcDisplayContainer(vcr: ViewContainerRef) {
		this.displayContainer = vcr;
	}

	@HostBinding('tabindex') tabindex = 0;

	@Input('pickerOverlap') set overlapInput(o: boolean) {
		this.target.overlap = o;
	}

	@Input('placeholder') set inputPlaceholder(p: string) {
		this._placeholder = p;
	}
	@Input('multiple') set inputMultiple(m: boolean | string) {
		if (m === '') {
			// allows to have multiple = true when writing
			// <lu-select multiple>
			this.multiple = true;
		} else {
			this.multiple = !!m;
		}
	}
	/** Event emitted when the associated popover is opened. */
	@Output() onOpen = new EventEmitter<void>();
	/** Event emitted when the associated popover is closed. */
	@Output() onClose = new EventEmitter<void>();

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}
	@HostBinding('class.is-disabled')
	get isDisabled() {
		return this.disabled;
	}
	@Input()
	override set disabled(d: boolean) {
		this._disabled = d;
	}
	@HostBinding('class.is-focused')
	get isFocused() {
		return this._popoverOpen && !this.target.overlap;
	}
	@HostBinding('class.mod-multiple')
	get modMultiple() {
		return this._multiple;
	}

	@HostBinding('class.is-clearable')
	get isClearable() {
		return !!this._clearer;
	}
	/**
	 * popover trigger class extension
	 */
	@ContentChild(ALuPickerPanel, { static: true }) ccPicker: TPicker;
	@ViewChild(ALuPickerPanel, { static: true }) vcPicker: TPicker;

	@ContentChild(ALuInputDisplayer, { static: true })
	ccDisplayer: ILuInputDisplayer<T>;
	@ViewChild(ALuInputDisplayer, { static: true })
	vcDisplayer: ILuInputDisplayer<T>;

	@ContentChild(ALuClearer, { static: true }) ccClearer: ILuClearer<T>;
	@ViewChild(ALuClearer, { static: true }) vcClearer: ILuClearer<T>;

	@HostListener('click')
	override onClick() {
		super.onClick();
	}
	@HostListener('mouseenter')
	override onMouseEnter() {
		super.onMouseEnter();
	}
	@HostListener('mouseleave')
	override onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	override onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
	override onBlur() {
		super.onBlur();
	}
	@HostListener('keydown.space', ['$event'])
	@HostListener('keydown.enter', ['$event'])
	onKeydown($event: KeyboardEvent) {
		if (!this._popoverOpen) {
			this.openPopover();
			$event.stopPropagation();
			$event.preventDefault();
		}
	}

	ngAfterViewInit() {
		this._isContentInitialized = true;

		// init picker and displayer and clearer
		const picker = this.ccPicker || this.vcPicker;
		if (picker) {
			this._picker = picker;
		}
		const displayer = this.ccDisplayer || this.vcDisplayer;
		if (displayer) {
			this._displayer = displayer;
		}
		const clearer = this.ccClearer || this.vcClearer;
		if (clearer) {
			this._clearer = clearer;
		}

		this.render();
		this._picker.setValue(this.value);

		// strange bug where the view renderred in the displayer was only injected after a hover
		// no matter how many cdr.markforchack i added
		// but with a timeout it works
		// shrug emoji
		setTimeout(() => {
			this._changeDetectorRef.markForCheck();
		}, 1);
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
 */
@Component({
	selector: 'lu-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelectInputComponent),
			multi: true,
		},
	],
})
export class LuSelectInputComponent<T> extends ALuSelectInputComponent<T> implements AfterViewInit {
	@HostBinding('class.mod-multipleView')
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
	@ContentChild(ALuClearer, { read: ElementRef, static: false })
	clearerEltRef: ElementRef<HTMLElement>;
	@ViewChild('suffix', { read: ElementRef, static: true })
	suffixEltRef: ElementRef<HTMLElement>;
	displayClearer() {
		if (this.clearerEltRef) {
			this._renderer.appendChild(this.suffixEltRef.nativeElement, this.clearerEltRef.nativeElement);
		}
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit();
		this.displayClearer(); // dont keep
	}
}

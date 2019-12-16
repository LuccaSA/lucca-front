import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ContentChild,
	HostListener,
	ViewChild,
	AfterContentInit,
	Renderer2,
	Input,
	HostBinding,
	OnDestroy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import {
	ILuInputWithPicker,
	ILuPickerPanel,
	ALuPickerPanel,
} from '@lucca-front/ng/picker';
import {
	ALuClearer,
	ILuClearer,
	ILuInputDisplayer,
	ALuInputDisplayer,
} from '@lucca-front/ng/input';
import { ALuSelectInput } from './select-input.model';
import { BreakpointObserver } from '@angular/cdk/layout';

export abstract class ALuSelectInputComponent<T = any, P extends ILuPickerPanel<T> = ILuPickerPanel<T>>
extends ALuSelectInput<T, P>
implements ControlValueAccessor, ILuInputWithPicker<T>, AfterContentInit, OnDestroy {
	@ViewChild('display', { read: ViewContainerRef, static: true }) protected set _vcDisplayContainer(vcr: ViewContainerRef) {
		this.displayContainer = vcr;
	}

	@HostBinding('tabindex') tabindex = 0;

	@Input('pickerOverlap') set overlapInput(o: boolean) {
		this.target.overlap = o;
	}

	@Input('placeholder') set inputPlaceholder(p: string) { this._placeholder = p; }
	@Input('multiple') set inputMultiple(m: boolean | string) {
		if (m === '') {
			// allows to have multiple = true when writing
			// <lu-select multiple>
			this.multiple = true;
		} else {
			this.multiple = !!m;
		}
	}
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		protected _breakpointObserver?: BreakpointObserver,
		) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
			_breakpointObserver,
		);
	}
	@HostBinding('class.is-disabled')
	get isDisabled() { return this.disabled; }
	@HostBinding('class.is-focused')
	get isFocused() { return this._popoverOpen && !this.target.overlap; }
	@HostBinding('class.mod-multiple')
	get modMultiple() { return this._multiple; }

	@HostBinding('class.is-clearable')
	get isClearable() { return !!this._clearer; }
	/**
	 * popover trigger class extension
	 */
	@ContentChild(ALuPickerPanel, { static: true }) set _contentChildPicker(picker: P) {
		if (!picker) { return; }
		this._picker = picker;
	}

	@ContentChild(ALuInputDisplayer, { static: true }) set _contentChildDisplayer(displayer: ILuInputDisplayer<T>) {
		if (!displayer) { return; }
		this.displayer = displayer;
	}

	@HostListener('click')
	onClick() {
		super.onClick();
	}
	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}
	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
	onBlur() {
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


	ngAfterContentInit() {
		this._isContentInitialized = true;
		this.render();
		this._picker.setValue(this.value);
	}
	ngOnDestroy() {
		this.closePopover();
		this.destroyPopover();
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
export class LuSelectInputComponent<T = any, P extends ILuPickerPanel<T> = ILuPickerPanel<T>> extends ALuSelectInputComponent<T, P> {
	@ContentChild(ALuClearer, { static: true }) set _contentChildClearer(clearer: ILuClearer) {
		if (!clearer) { return; }
		this._clearer = clearer;
	}
	@HostBinding('class.mod-multipleView')
	get modMultipleView() { return this.useMultipleViews(); }
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		protected _breakpointObserver?: BreakpointObserver,
		) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
			_breakpointObserver,
		);
	}
	// display clearer
	@ContentChild(ALuClearer, { read: ElementRef, static: true }) clearerEltRef: ElementRef;
	@ViewChild('suffix', { read: ElementRef, static: true }) suffixEltRef: ElementRef;
	displayClearer() {
		if (!!this.clearerEltRef) {
			this._renderer.appendChild(this.suffixEltRef.nativeElement, this.clearerEltRef.nativeElement);
		}
	}

	ngAfterContentInit() {
		super.ngAfterContentInit();
		this.displayClearer(); // dont keep
	}
}

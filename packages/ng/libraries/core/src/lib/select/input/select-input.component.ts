import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ContentChild,
	HostListener,
	TemplateRef,
	ViewChild,
	AfterViewInit,
	ViewRef,
	Renderer2,
	Input,
	HostBinding,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import {
	ILuInputWithPicker,
	ILuPickerPanel,
	ALuPickerPanel,
	ALuClearer,
	ILuClearer,
	ILuInputDisplayer,
	ALuInputDisplayer,
} from '../../input/index';
import { ALuSelectInput } from './select-input.model';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
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
export class LuSelectInputComponent<T = any, P extends ILuPickerPanel<T> = ILuPickerPanel<T>>
extends ALuSelectInput<T, P>
implements ControlValueAccessor, ILuInputWithPicker<T>, AfterViewInit {
	@ViewChild('display', { read: ViewContainerRef }) protected set _vcDisplayContainer(vcr: ViewContainerRef) {
		this.displayContainer = vcr;
	}

	@HostBinding('tabindex') tabindex = 0;

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
		protected _renderer: Renderer2,
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}
	@HostBinding('class.is-disabled')
	get isDisabled() { return this.disabled; }
	@HostBinding('class.is-clearable')
	get isClearable() { return !!this.clearerEltRef; }
	@HostBinding('class.mod-multiple')
	get modMultiple() { return this._multiple; }
	@HostBinding('class.mod-multipleView')
	get modMultipleView() { return this.useMultipleViews(); }
	/**
	 * popover trigger class extension
	 */
	@ContentChild(ALuPickerPanel) set _contentChildPicker(picker: P) {
		this._picker = picker;
	}
	@ContentChild(ALuClearer) set _contentChildClearer(clearer: ILuClearer) {
		this._clearer = clearer;
	}
	@ContentChild(ALuInputDisplayer) set _contentChildDisplayer(displayer: ILuInputDisplayer<T>) {
		this.displayer = displayer;
		this.render();
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
		this.openPopover();
		$event.stopPropagation();
		$event.preventDefault();
	}


	ngAfterViewInit() {
		this.render();
		this.displayClearer();
		this._picker.setValue(this.value);
	}

	// display clearer
	@ContentChild(ALuClearer, { read: ElementRef }) clearerEltRef: ElementRef;
	@ViewChild('suffix', { read: ElementRef }) suffixEltRef: ElementRef;
	displayClearer() {
		if (!!this.clearerEltRef) {
			this._renderer.appendChild(this.suffixEltRef.nativeElement, this.clearerEltRef.nativeElement);
		}
	}
}

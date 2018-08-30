import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	HostListener,
	ViewChild,
	Input,
	Renderer2,
	HostBinding,
	AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel, ALuClearer, ILuClearer, ALuInputDisplayer, ILuInputDisplayer } from '../../../input/index';
import { ALuSelectInput } from '../../../select/index';
import { ILuOptionPickerPanel } from '../../../option/index';
import { IApiItem } from '../../api.model';
import { ALuApiPagedSearcherService, LuApiPagedSearcherService } from '../searcher/index';

@Component({
	selector: 'lu-api-select',
	templateUrl: './api-select-input.component.html',
	styleUrls: ['./api-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuApiSelectInputComponent),
			multi: true,
		},
		{
			provide: ALuApiPagedSearcherService,
			useClass: LuApiPagedSearcherService,
		},
	],
})
export class LuApiSelectInputComponent<T extends IApiItem = IApiItem, P extends ILuOptionPickerPanel<T> = ILuOptionPickerPanel<T>>
extends ALuSelectInput<T, P>
implements ControlValueAccessor, ILuInputWithPicker<T>, AfterViewInit {
	@ViewChild('display', { read: ViewContainerRef }) protected set _vcDisplayContainer(vcr: ViewContainerRef) {
		this.displayContainer = vcr;
	}
	@Input('placeholder') set inputPlaceholder(p: string) { this._placeholder = p; }

	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set transformFn(transformFn: (item: any) => T) { this._service.transformFn = transformFn; }

	@Input('multiple') set inputMultiple(m: boolean | string) {
		if (m === '') {
			// allows to have multiple = true when writing
			// <lu-api-select multiple>
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
		protected _service: ALuApiPagedSearcherService<T>,
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
	/**
	 * popover trigger class extension
	 */
	@ViewChild(ALuPickerPanel) set _vcPicker(picker: P) {
		this._picker = picker;
	}
	@ViewChild(ALuClearer) set _contentChildClearer(clearer: ILuClearer) {
		this._clearer = clearer;
	}
	@ViewChild(ALuInputDisplayer) set _contentChildDisplayer(displayer: ILuInputDisplayer<T>) {
		this.displayer = displayer;
		this.render();
	}
	/**
	 * bind to dom events
	 */
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

	ngAfterViewInit() {
		this.render();
		this._picker.setValue(this.value);
	}
}

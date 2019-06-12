import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ViewChild,
	Renderer2,
	AfterContentInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel, ALuClearer, ILuClearer, ALuInputDisplayer, ILuInputDisplayer } from '../../../input/index';
import { ALuSelectInputComponent } from '../../../select/index';
import { ILuOptionPickerPanel } from '../../../option/index';
import { ILuDepartment } from '../../department.model';

@Component({
	selector: 'lu-department-select',
	templateUrl: './department-select-input.component.html',
	styleUrls: ['./department-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDepartmentSelectInputComponent),
			multi: true,
		},
	],
})
export class LuDepartmentSelectInputComponent<D extends ILuDepartment = ILuDepartment, P extends ILuOptionPickerPanel<D> = ILuOptionPickerPanel<D>>
extends ALuSelectInputComponent<D, P>
implements ControlValueAccessor, ILuInputWithPicker<D>, AfterContentInit {

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}

	@ViewChild(ALuPickerPanel, { static: true }) set _vcPicker(picker: P) {
		if (!picker) { return; }
		this._picker = picker;
	}
	@ViewChild(ALuClearer, { static: true }) set _vcClearer(clearer: ILuClearer) {
		if (!clearer) { return; }
		this._clearer = clearer;
	}
	@ViewChild(ALuInputDisplayer, { static: true }) set _vcDisplayer(displayer: ILuInputDisplayer<D>) {
		if (!displayer) { return; }
		this.displayer = displayer;
	}

	searchFn(o, c) {
		return o.name.toLowerCase().startsWith(c.toLowerCase());
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ViewChild,
	Renderer2,
	AfterContentInit,
	Inject,
	AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ALuClearer, ILuClearer, ALuInputDisplayer, ILuInputDisplayer } from '@lucca-front/ng/input';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ILuInputWithPicker, ALuPickerPanel } from '@lucca-front/ng/picker';
import { ILuOptionPickerPanel } from '@lucca-front/ng/option';
import { ILuDepartment } from '../../department.model';
import { LuDepartmentSelectInputIntl } from './department-select-input.intl';
import { ILuDepartmentSelectInputLabel } from './department-select-input.translate';
import { LuOptionComparer } from '@lucca-front/ng/option';

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
implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit {
	byId: LuOptionComparer<D> = (option1: D, option2: D) => option1 && option2 && option1.id === option2.id;

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		@Inject(LuDepartmentSelectInputIntl) public intl: ILuDepartmentSelectInputLabel,
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}

	searchFn(o, c) {
		return o.name.toLowerCase().startsWith(c.toLowerCase());
	}
}

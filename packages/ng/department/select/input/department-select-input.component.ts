import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { LuInputClearerComponent, LuInputDisplayerDirective } from '@lucca-front/ng/input';
import {
	ILuTreeOptionPickerPanel,
	LuForTreeOptionsDirective,
	LuOptionComparer,
	LuTreeOptionItemComponent,
	LuTreeOptionPickerAdvancedComponent,
	LuTreeOptionPickerComponent,
	LuTreeOptionSearcherComponent,
	LuTreeOptionSelectAllComponent,
} from '@lucca-front/ng/option';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuDepartmentFeederComponent } from '../feeder';
import { LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS } from './department-select-input.translate';

@Component({
	selector: 'lu-department-select',
	templateUrl: './department-select-input.component.html',
	styleUrls: ['./department-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		CommonModule,
		OverlayModule,
		A11yModule,
		LuInputClearerComponent,
		LuTreeOptionPickerComponent,
		LuTreeOptionPickerAdvancedComponent,
		LuDepartmentFeederComponent,
		LuTreeOptionSearcherComponent,
		LuTreeOptionSelectAllComponent,
		LuTreeOptionItemComponent,
		LuForTreeOptionsDirective,
		LuInputDisplayerDirective,
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDepartmentSelectInputComponent),
			multi: true,
		},
	],
})
export class LuDepartmentSelectInputComponent<
		D extends import('../../department.model').ILuDepartment = import('../../department.model').ILuDepartment,
		P extends ILuTreeOptionPickerPanel<D> = ILuTreeOptionPickerPanel<D>,
	>
	extends ALuSelectInputComponent<D, P>
	implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit
{
	byId: LuOptionComparer<D> = (option1: D, option2: D) => option1 && option2 && option1.id === option2.id;

	@Input() appInstanceId: number | string;
	@Input() operations: number[];
	@Input() filters: string[];

	public intl = getIntl(LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS);

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}

	searchFn(o: D, c: string): boolean {
		return o.name.toLowerCase().includes(c.toLowerCase());
	}
}

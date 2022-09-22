import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LuInputClearerComponent, LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { ILuOptionItem, LuForOptionsDirective, LuOptionComparer, LuOptionPickerAdvancedComponent, LuOptionPickerModule } from '@lucca-front/ng/option';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuApiSearcherModule } from '../searcher';

@Component({
	selector: 'lu-api-select',
	templateUrl: './api-select-input.component.html',
	styleUrls: ['./api-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, LuOptionPickerModule, LuForOptionsDirective, LuApiSearcherModule, LuInputClearerComponent, LuInputDisplayerDirective],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuApiSelectInputComponent),
			multi: true,
		},
	],
})
export class LuApiSelectInputComponent<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem>
	extends ALuSelectInputComponent<T, LuOptionPickerAdvancedComponent<T, ILuOptionItem<T>>>
	implements ControlValueAccessor, AfterViewInit
{
	@Input() standard: 'v3' | 'v4' = 'v3';
	@Input() api: string;
	/**
	 * only works with standard="v3"
	 */
	@Input() fields: string;
	@Input() filters: string[];
	/**
	 * only works with standard="v3", otherwise use sort
	 */
	@Input() orderBy: string;
	/**
	 * only works with standard="v4", otherwise use orderBy
	 */
	@Input() sort: string;

	byId: LuOptionComparer<T> = (option1: T, option2: T) => option1 && option2 && option1.id === option2.id;
	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}
}

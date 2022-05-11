import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ILuOptionItem, LuOptionComparer, LuOptionPickerAdvancedComponent } from '@lucca-front/ng/option';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';

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
	],
})
export class LuApiSelectInputComponent<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem>
	extends ALuSelectInputComponent<T, LuOptionPickerAdvancedComponent<T, ILuOptionItem<T>>>
	implements ControlValueAccessor, AfterViewInit
{
	@Input() standard: 'v3' | 'v4';
	@Input() api: string;
	@Input() fields: string;
	/**
	 * only works with standard="v3"
	 */
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

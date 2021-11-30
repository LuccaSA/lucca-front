import { Overlay } from '@angular/cdk/overlay';
import {
	AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input,
	Renderer2, ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ILuApiItem } from '../../api.model';

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
export class LuApiSelectInputComponent<T extends ILuApiItem = ILuApiItem>
	extends ALuSelectInputComponent<T>
	implements ControlValueAccessor, AfterViewInit {

	@Input() standard: string;
	@Input() api: string;
	@Input() fields: string;
	@Input() filters: string[];
	@Input() orderBy: string;

	byId: LuOptionComparer<T> = (option1: T, option2: T) => option1 && option2 && option1.id === option2.id;
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
}

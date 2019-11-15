import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'lu-date-calendar',
	templateUrl: './date-calendar.component.html',
	styleUrls: ['./date-calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateCalendarComponent),
			multi: true,
		},
	],
})
export class LuDateCalendarComponent extends ALuInput implements ControlValueAccessor {
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef,
		_renderer: Renderer2,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	protected render() {}
	debug() {
		this.setValue(new Date('2019-01-01'))
	}
}

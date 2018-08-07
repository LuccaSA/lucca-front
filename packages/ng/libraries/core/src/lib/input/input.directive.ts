import { Directive, ElementRef, Input, OnInit, Renderer2, ChangeDetectorRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ALuInput } from './input.model';

/**
 * adds class is-filled when model is empty
 */
@Directive({
	selector: '[luInput]',
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuInputDirective),
			multi: true,
		},
	],
})
export class LuInputDirective<T = any> extends ALuInput<T> {
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _elementRef: ElementRef,
		protected _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	protected render() {}
}

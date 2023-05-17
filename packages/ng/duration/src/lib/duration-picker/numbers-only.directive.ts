import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
	selector: 'input[luNumbersOnly]',
	standalone: true,
})
export class LuNumberOnlyDirective {
	@Output() public valueChange = new EventEmitter();
	public constructor(private _el: ElementRef<HTMLInputElement>) {}

	@HostListener('input', ['$event'])
	public onInputChange(event: Event) {
		const initialValue = this._el.nativeElement.value;
		const newValue = initialValue.replace(/[^0-9]*/g, '');
		this._el.nativeElement.value = newValue;
		this.valueChange.emit(newValue);
		if (initialValue !== this._el.nativeElement.value) {
			event.stopPropagation();
		}
	}
}

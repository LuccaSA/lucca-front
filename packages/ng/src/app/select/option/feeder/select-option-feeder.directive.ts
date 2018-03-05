import {
	Directive,
	ViewContainerRef,
	} from '@angular/core';
import {ISelectOptionFeeder} from './select-option-feeder.model';


/**
 * Directive to put on a div to allow it to react with a popover to emulate a select component
 */
@Directive({
	selector: '[luOptionFeeder]',
})
export class LuOptionFeederDirective<T> {


	private _selectOptionFeeder: ISelectOptionFeeder<T>;
	constructor(
		protected _viewContainerRef: ViewContainerRef,
	) {
		this._selectOptionFeeder = <ISelectOptionFeeder<T>> _viewContainerRef.element.nativeElement;
	}
}

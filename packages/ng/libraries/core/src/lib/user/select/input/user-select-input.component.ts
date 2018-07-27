import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ContentChild,
	HostListener,
	TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel } from '../../../input/index';
import { IUser } from '../../user.model';
import { LuSelectInputComponent } from '../../../select/index';
import { ILuUserPickerPanel } from '../../picker/index';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-user-select',
	templateUrl: './user-select-input.component.html',
	styleUrls: ['./user-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuSelectInputComponent),
			multi: true,
		},
	],
})
export class LuUserSelectInputComponent<U extends IUser = IUser, P extends ILuUserPickerPanel<U> = ILuUserPickerPanel<U>>
extends LuSelectInputComponent<U, P>
implements ControlValueAccessor, ILuInputWithPicker<U> {
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
		);
	}


	/**
	 * popover trigger class extension
	 */
	@Input('picker') set _attrPicker(picker: P) {
		this.popover = picker;
		this.popover.onSelectValue.subscribe(value => this.setValue(value));
		this.popover.close.subscribe(e => this._onTouched());
	}
	@ContentChild(ALuPickerPanel) set _contentChildPicker(picker: P) {
		this.popover = picker;
		this.popover.onSelectValue.subscribe(value => this.setValue(value));
		this.popover.close.subscribe(e => this._onTouched());
	}

	/**
	 * bind to dom events
	 */
	@HostListener('click')
	onClick() {
		super.onClick();
	}
	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}
	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
	onBlur() {
		super.onBlur();
	}

	// protected _getOverlayConfig(): OverlayConfig {
	// 	const config = super._getOverlayConfig();
	// 	const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
	// 	config.width = `${clientRect.width}px`; // might become min/maxWidth
	// 	return config;
	// }

	displayTemplate: TemplateRef<any>;
	// @ContentChild(TemplateRef) set _contentChildDisplayTemplate(templateRef: TemplateRef<any>) {
	// 	this.displayTemplate = templateRef;
	// }
}

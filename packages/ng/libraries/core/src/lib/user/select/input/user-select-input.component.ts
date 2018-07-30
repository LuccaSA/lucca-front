import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	HostListener,
	TemplateRef,
	ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel } from '../../../input/index';
import { IUser } from '../../user.model';
import { ALuSelectInput } from '../../../select/index';
import { ILuOptionPickerPanel } from '../../../option/index';
import { LuDisplayFullname } from '../../display/index';

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
			useExisting: forwardRef(() => LuUserSelectInputComponent),
			multi: true,
		},
	],
})
export class LuUserSelectInputComponent<U extends IUser = IUser, P extends ILuOptionPickerPanel<U> = ILuOptionPickerPanel<U>>
extends ALuSelectInput<U, P>
implements ControlValueAccessor, ILuInputWithPicker<U> {
	searchFormat = LuDisplayFullname.lastfirst;
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
	@ViewChild(ALuPickerPanel) set _vcPicker(picker: P) {
		this._picker = picker;
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

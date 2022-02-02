import {
	ChangeDetectionStrategy,
	Component,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-radiosfield-layout',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './radiosfield-layout.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperRadiosfieldLayout extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;

	get mod() {
		return this.to['mod'] || '';
	}

	get isRequired() {
		return !!this.to && !!this.to.required ? 'is-required' : '';
	}

	get isFocused() {
		return !!this.to && this.to['_isFocused'] ? 'is-focused' : '';
	}

	get isError() {
		return this.formControl.invalid && this.formControl.touched
			? 'is-error'
			: '';
	}
}

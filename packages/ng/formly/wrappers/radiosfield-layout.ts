import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-radiosfield-layout',
	styleUrl: 'flex-layout.scss',
	templateUrl: './radiosfield-layout.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LuFormlyWrapperRadiosfieldLayout extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;

	get mod() {
		return (this.props['mod'] || '') as string;
	}

	get isRequired() {
		return !!this.props && !!this.props.required ? 'is-required' : '';
	}

	get isFocused() {
		return !!this.props && this.props['_isFocused'] ? 'is-focused' : '';
	}

	get isError() {
		return this.formControl.invalid && this.formControl.touched ? 'is-error' : '';
	}
}

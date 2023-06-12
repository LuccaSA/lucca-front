import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-checkbox-layout',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './checkbox-layout.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyWrapperCheckboxLayout extends FieldWrapper {
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

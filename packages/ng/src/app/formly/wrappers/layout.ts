import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyConfig, FieldType } from 'ng-formly';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-layout',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './layout.html',
})
export class LuFormlyWrapperLayout extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

	get mod() {
		return this.to.mod || '';
	}

	get modWithSuffix() {
		return !!this.to && !!this.to.suffix ? 'mod-withSuffix' : '';
	}
}

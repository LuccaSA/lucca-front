import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyConfig, FieldType } from 'ng-formly';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-layout',
	templateUrl: './layout.html',
})
export class LuFormlyWrapperLayout extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}

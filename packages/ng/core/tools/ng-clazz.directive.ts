import { Directive } from '@angular/core';
import { NgClass } from '@angular/common';

// This directive exists to temporarily resolve a conflict in how directives work, see https://github.com/angular/angular/issues/52072
@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[ngClazz]',
	standalone: true,
})
export class NgClazzDirective extends NgClass {}

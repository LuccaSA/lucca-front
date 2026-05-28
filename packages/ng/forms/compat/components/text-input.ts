import { Directive, inject } from '@angular/core';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { provideNgValueAccessorCompat } from '../core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-text-input[formControl], lu-text-input[formControlName], lu-text-input[ngModel]',
	providers: [provideNgValueAccessorCompat(() => inject(TextInputComponent))],
})
export class TextInputCompatDirective {}

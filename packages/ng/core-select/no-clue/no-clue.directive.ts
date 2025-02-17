import { Directive, inject } from '@angular/core';
import { ALuSelectInputComponent } from '../input/index';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[noClue],lu-multi-select[noClue]',
	standalone: true,
})
export class LuCoreSelectNoClueDirective {
	constructor() {
		inject(ALuSelectInputComponent).clueChange.complete();
	}
}

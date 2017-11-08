import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'demo-empty-custom-fn',
	templateUrl: './custom-fn.html',
})
export class CustomFnComponent {
	val = 0;
	customFn = val => val % 2;
}



import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from 'ng-formly';

@Component({
	selector: 'demo-not-empty-custom-fn',
	templateUrl: './custom-fn.html',
})
export class CustomFnComponent {
	val = 0;
	customFn = val => val % 2;
}



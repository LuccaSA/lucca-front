import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'lu-formly-wrappers',
	templateUrl: './formly-wrappers.component.html'
})
export class FormlyWrappersComponent {
	form: FormGroup = new FormGroup({});
	model = {};
	fields = [{
		key: 'helper',
		type: 'input',
		templateOptions: {
			type: 'text',
			label: 'this one has a helper',
			helper: 'this is the helper message',
		},
	}, {
		key: 'icon',
		type: 'input',
		templateOptions: {
			type: 'text',
			label: 'this one has an icon',
			icon: 'heart',
		},
	}, {
		key: 'suffix',
		type: 'input',
		templateOptions: {
			type: 'text',
			label: 'this one has a suffix',
			suffix: 'LOL',
		},
	}];

	submit() {}
}

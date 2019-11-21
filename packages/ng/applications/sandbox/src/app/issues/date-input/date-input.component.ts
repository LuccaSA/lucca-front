import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'sand-date-input',
	templateUrl: './date-input.component.html'
})
export class DateInputComponent implements OnInit {
	date = new Date();
	form = new FormGroup({
		date: new FormControl(),
	});
	submit() {
		console.log(this.form.value);
	}
	ngOnInit() {
		this.form.valueChanges.subscribe(v => {
			const f = this.form;
		})
	}
}

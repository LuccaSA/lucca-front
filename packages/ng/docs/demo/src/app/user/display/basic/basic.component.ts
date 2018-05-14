import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-basic-user-display',
	templateUrl: './basic.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class BasicComponent implements OnInit {
	user = { firstName: 'John', lastName: 'Doe' };
	availableFormats = [
		'fl',
		'Fl',
		'FL',
		'fL',
		'lf',
		'Lf',
		'LF',
		'lF',
		'f',
		'F',
		'l',
		'L',
	];
	selectedFormat = 'fl';

	constructor() {}

	ngOnInit() {}
}

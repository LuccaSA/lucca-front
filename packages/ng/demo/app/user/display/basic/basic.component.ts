import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-basic-user-display',
	templateUrl: './basic.component.html',
	styles: []
})
export class BasicComponent implements OnInit {
	user = { firstName: 'John', lastName: 'Doe' };
	availableFormats = ['fl', 'Fl', 'FL', 'fL', 'lf', 'Lf', 'LF', 'lF'];
	selectedFormat = 'fl';

	constructor() { }

	ngOnInit() {
	}

}

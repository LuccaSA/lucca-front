import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-basic-user-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class BasicComponent implements OnInit {
	user = { firstName: 'John', lastName: 'Doe' };

	constructor() {}

	ngOnInit() {}
}

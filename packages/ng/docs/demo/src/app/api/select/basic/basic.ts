import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-api-select-basic',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class BasicComponent implements OnInit {
	department = { id: 1, name: 'lucca' };

	constructor() {}

	ngOnInit() {}
}

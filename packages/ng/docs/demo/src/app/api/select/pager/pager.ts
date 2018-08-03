import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-api-select-pager',
	templateUrl: './pager.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class PagerComponent implements OnInit {
	user;

	constructor() {}

	ngOnInit() {}
}

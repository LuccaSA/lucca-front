import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-user-select-searcher',
	templateUrl: './searcher.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class SearcherComponent implements OnInit {
	user;
	filters = ['departmentId=16'];
	fields = 'id,firstname,lastname,picture[href],jobtitle';

	constructor() {}

	ngOnInit() {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-api-select-searcher',
	templateUrl: './searcher.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class SearcherComponent implements OnInit {
	department = { id: 1, name: 'lucca' };
	le = { id: 1, name: 'lucca' };
	section;

	constructor() {}

	ngOnInit() {}
}

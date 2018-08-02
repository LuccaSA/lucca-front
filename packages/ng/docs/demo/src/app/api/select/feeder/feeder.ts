import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'demo-api-select-feeder',
	templateUrl: './feeder.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class FeederComponent implements OnInit {
	department = { id: 1, name: 'lucca' };
	le = { id: 1, name: 'lucca' };

	constructor() {}

	ngOnInit() {}
}

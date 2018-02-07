import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'demo-simple-select',
	templateUrl: './simple-select.component.html',
})
export class DemoSimpleSelectComponent implements OnInit {
	options = [
		{ id: 1, name: 'red' },
		{ id: 2, name: 'green' },
		{ id: 3, name: 'yellow' },
		{ id: 4, name: 'blue' },
	];
	itemSelect = {id: 1, name: 'red'};

	lotOfOptions = [];
	itemLotOfOptionsSelect = {id: 1, name: 'option 1'};

	ngOnInit(): void {
		const optionsTmp = [];
		for (let i = 1; i <= 100; i++) {
			optionsTmp.push({
				id: i,
				name: `option ${i}`
			});
		}

		this.lotOfOptions = optionsTmp;
	}

}

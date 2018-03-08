import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'demo-feeder-select',
	templateUrl: './feeder-select.component.html',
})
export class DemoFeederSelectComponent implements OnInit {

	itemSelect = {id: 1, name: 'option 1'};

	ngOnInit(): void {

	}

}

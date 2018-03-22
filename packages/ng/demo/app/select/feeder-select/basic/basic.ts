import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'basic-feeder-select',
	templateUrl: './basic.html',
})
export class BasicFeederSelectComponent implements OnInit {

	itemSelect = {id: 1, name: 'option 1'};

	ngOnInit(): void {

	}

}

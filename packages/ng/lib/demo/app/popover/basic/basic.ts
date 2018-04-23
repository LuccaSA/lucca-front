import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../src/app/user';

@Component({
	selector: 'demo-popover-basic',
	templateUrl: './basic.html',
	styles: [],
})
export class DemoPopoverBasicComponent implements OnInit {
	user: IUser = {
		id: 12,
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: {
			href:
				'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg',
		},
		jobTitle: 'Actress',
	};
	constructor() {}

	ngOnInit() {}
}

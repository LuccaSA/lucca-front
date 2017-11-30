import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../src/app/user';

@Component({
	selector: 'demo-lu-popover-basic',
	templateUrl: './basic.component.html',
	styles: []
})
export class BasicComponent implements OnInit {
	user: IUser = {
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: { href: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg' },
		jobTitle: 'Actress'
	};
	constructor() { }

	ngOnInit() {
	}

}

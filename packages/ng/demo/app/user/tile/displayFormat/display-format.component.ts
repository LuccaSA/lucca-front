import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-displayformat',
	templateUrl: './display-format.component.html',
	styles: [' .tiles{display: inline-table} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px; float: left}']
})
export class DisplayFormatComponent implements OnInit {

	anais: IUser = {
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: { href: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg' },
		jobTitle: 'Actress'
	};

	constructor() { }

	ngOnInit() {
	}

}

import { Component, OnInit } from '@angular/core';
import {IUser} from '../../../../src/app/user-tile/user-tile.models';

@Component({
	selector: 'demo-basic',
	templateUrl: './basic.component.html',
	styles: [' .tiles{display: inline-table} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px; float: left}']
})
export class BasicComponent implements OnInit {

	user: IUser = {
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: {url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg'},
		jobTitle: 'Actress'
	};

	noPicUser: IUser = {
		firstName: 'Jean-Michel',
		lastName: 'Pasdephoto',
		picture: {url: ''},
		jobTitle: 'Actor'
	};

	constructor() { }

	ngOnInit() {
	}

}

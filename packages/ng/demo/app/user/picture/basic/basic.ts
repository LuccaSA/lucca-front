import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-user-picture-basic',
	templateUrl: './basic.html',
	styles: []
})
export class DemoUserPictureBasicComponent implements OnInit {

	anais: IUser = {
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: {href: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg'},
		jobTitle: 'Actress'
	};

	jeanMich: IUser = {
		firstName: 'Jean-Michel',
		lastName: 'Pasdephoto',
		picture: {href: ''},
		jobTitle: 'Actor'
	};

	constructor() { }

	ngOnInit() {
	}

}

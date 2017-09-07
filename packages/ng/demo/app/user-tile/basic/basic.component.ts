import { Component, OnInit } from '@angular/core';
import {User} from '../../../../src/app/user-tile/user-tile.models';

@Component({
	selector: 'demo-basic',
	templateUrl: './basic.component.html',
	styles: [' .tiles{display: flex} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px;}']
})
export class BasicComponent implements OnInit {

	user: User = {
		displayName: 'Anaïs Lemoustier',
		picture: {url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg'},
		jobTitle: 'Actress'
	};

	constructor() { }

	ngOnInit() {
	}

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-basic',
	templateUrl: './basic.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		' .tiles{display: inline-table} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px; float: left}',
	],
})
export class BasicComponent implements OnInit {
	anais: IUser = {
		id: 12,
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: {
			href:
				'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg',
		},
		jobTitle: 'Actress',
	};

	jeanMich: IUser = {
		id: 12,
		firstName: 'Jean-Michel',
		lastName: 'Pasdephoto',
		picture: { href: '' },
		jobTitle: 'Actor',
	};

	jeanPascal = {
		id: 12,
		firstName: 'Jean Pierre',
		lastName: 'Pernaud',
		picture: { href: '' },
		jobTitle: `L'ami des retraites`,
	};

	constructor() {}

	ngOnInit() {}
}

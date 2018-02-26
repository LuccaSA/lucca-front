import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-sizes',
	templateUrl: './sizes.component.html',
	styles: [' .tiles{display: inline-table} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px; float: left}']
})
export class SizesComponent implements OnInit {
	jeanMich: IUser = {
		firstName: 'Jean-Michel',
		lastName: 'Pasdephoto',
		picture: { href: '' },
		jobTitle: 'Actor'
	};

	constructor() { }

	ngOnInit() {
	}

}

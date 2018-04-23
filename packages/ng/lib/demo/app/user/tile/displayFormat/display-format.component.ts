import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-displayformat',
	templateUrl: './display-format.component.html',
	styles: [
		' .tiles{display: inline-table} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px; float: left}',
	],
})
export class DisplayFormatComponent implements OnInit {
	anais: IUser = {
		id: 12,
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		jobTitle: 'Actress',
	};

	constructor() {}

	ngOnInit() {}
}

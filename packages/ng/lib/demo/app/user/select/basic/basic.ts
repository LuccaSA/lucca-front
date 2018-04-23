import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-basic-user-select',
	templateUrl: './basic.html',
	styles: [],
})
export class DemoBasicUserSelectComponent {
	userSelect = {
		id: 464,
		firstName: 'Jean-François',
		lastName: 'Garreau',
	};

	constructor() {}
}

import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-basic-user-select2',
	templateUrl: './basic2.html',
	styles: []
})
export class DemoBasicUserSelect2Component {

	userSelect = {
		id: 464,
		firstName: "Jean-François",
		lastName: "Garreau"
	};

	constructor() { }


}

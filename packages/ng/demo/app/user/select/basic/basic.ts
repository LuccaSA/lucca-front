import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-basic-user-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoBasicUserSelectComponent {
	userSelect = {
		id: 464,
		firstName: 'Jean-François',
		lastName: 'Garreau',
	};

	userSelectMultiple = [{
		id: 464,
		firstName: 'Jean-François',
		lastName: 'Garreau',
	}];

	constructor() {}
}

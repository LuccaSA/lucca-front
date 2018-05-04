import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../../../../../src/app/user';

@Component({
	selector: 'demo-sizes',
	templateUrl: './sizes.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		' .tiles{display: inline-table} .user-tile {background: rgba(0, 0, 0, 0.05); margin: 5px; float: left}',
	],
})
export class SizesComponent implements OnInit {
	jeanMich: IUser = {
		id: 12,
		firstName: 'Jean-Michel',
		lastName: 'Pasdephoto',
		picture: { href: '' },
		jobTitle: 'Actor',
	};

	constructor() {}

	ngOnInit() {}
}

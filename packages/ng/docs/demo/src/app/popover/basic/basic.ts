import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '@lucca-front/ng';

@Component({
	selector: 'demo-popover-basic',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoPopoverBasicComponent implements OnInit {
	user: IUser = {
		id: 12,
		firstName: 'Anaïs',
		lastName: 'Lemoustier',
		picture: {
			href:
				'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ana%C3%AFs_Demoustier_Cabourg_2015.jpg',
		},
		jobTitle: 'Actress',
	};
	constructor() {}

	ngOnInit() {}
}

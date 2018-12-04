import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'scoped',
	templateUrl: './scoped.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class Scoped {
	user;
	appInstanceId;
	operations = [];
	ops = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

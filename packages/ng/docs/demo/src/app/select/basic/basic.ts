import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

@Component({
	selector: 'basic-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
	],
})
export class BasicSelectComponent {
	// options = [
	red =	{ id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
		// { id: 3, name: 'yellow' },
		// { id: 4, name: 'blue' },
	// ];
	itemSelect = this.red;

	number = { id: 1, name: 1 };
	options$ = interval(1000)
	.map(i => ({ id: i, name: '' + i }))
	.scan((acc, curr) => [ ...acc, curr], []);
	searchFn(o, c) {
		return o.name.startsWith(c);
	}
	withOperators = this.number;
}

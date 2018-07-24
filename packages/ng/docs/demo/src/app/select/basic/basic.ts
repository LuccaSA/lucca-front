import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
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
		// { id: 2, name: 'green' },
		// { id: 3, name: 'yellow' },
		// { id: 4, name: 'blue' },
	// ];
	itemSelect = this.red;
}

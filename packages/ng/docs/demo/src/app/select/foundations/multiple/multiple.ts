import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'multiple',
	templateUrl: './multiple.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
	],
})
export class MultipleComponent {
	red =	{ id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	yellow =	{ id: 3, name: 'yellow' };
	blue =	{ id: 4, name: 'blue' };
	item = this.red;
}

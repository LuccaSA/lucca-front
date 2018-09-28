import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'displayer',
	templateUrl: './displayer.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
	],
})
export class DisplayerComponent {
	red =	{ id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	yellow =	{ id: 3, name: 'yellow' };
	blue =	{ id: 4, name: 'blue' };
	item = this.red;
}

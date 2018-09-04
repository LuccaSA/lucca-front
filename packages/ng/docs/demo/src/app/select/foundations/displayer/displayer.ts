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
	item = this.red;
}

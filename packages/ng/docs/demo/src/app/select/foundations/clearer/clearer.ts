import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'clearer',
	templateUrl: './clearer.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
	],
})
export class ClearerComponent {
	red =	{ id: 1, name: 'red' };
	item = this.red;
}

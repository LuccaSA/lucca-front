import {
	ChangeDetectionStrategy,
	Component,
} from '@angular/core';

@Component({
	selector: 'multiple-select',
	templateUrl: './multiple.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
	],
})
export class MultipleSelectComponent {
	red =	{ id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	items = [this.red];
}

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
	blue = { id: 3, name: 'blue' };
	yellow =	{ id: 4, name: 'yellow' };
	items = [this.red];
	colors = [];
}

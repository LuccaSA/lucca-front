import {
	ChangeDetectionStrategy,
	Component
} from '@angular/core';
@Component({
	selector: 'basic-clearer-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicClearerSelectComponent {
	options = [
		{ id: 1, name: 'red' },
		{ id: 2, name: 'green' },
		{ id: 3, name: 'yellow' },
		{ id: 4, name: 'blue' },
	];
	itemSelect = { id: 1, name: 'red' };
	itemSelectDefault = { id: 4, name: 'blue' };
	itemSelectMultiple = [{ id: 1, name: 'red' }];
	itemSelectMultipleDefault = [{ id: 4, name: 'blue' }];
}

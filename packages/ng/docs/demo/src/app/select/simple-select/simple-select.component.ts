import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import { LuSelectIntl } from '@lucca-front/ng';
import {overrideSelectIntl} from './simple-select-intl';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'demo-simple-select',
	templateUrl: './simple-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{ provide: LuSelectIntl, useValue: overrideSelectIntl },
	],
})
export class DemoSimpleSelectComponent implements OnInit {
	options = [
		{ id: 1, name: 'red' },
		{ id: 2, name: 'green' },
		{ id: 3, name: 'yellow' },
		{ id: 4, name: 'blue' },
	];
	itemSelect = { id: 1, name: 'red' };
	itemSelectMultiple = [{ id: 1, name: 'red' }];

	lotOfOptions = [];
	itemLotOfOptionsSelect = { id: 1, name: 'option 1' };
	disabledFormControl = new FormControl(this.itemSelect);

	ngOnInit(): void {
		const optionsTmp = [];
		setTimeout(() => {
			for (let i = 1; i <= 100; i++) {
				optionsTmp.push({
					id: i,
					name: `option ${i}`,
				});
			}
			this.lotOfOptions = optionsTmp;
		}, 1000);
		this.disabledFormControl.disable();
	}
}

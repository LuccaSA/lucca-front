import {
	Component,
	forwardRef,
} from '@angular/core';
import { AbstractSelectOptionFeederComponent } from '../../../../src/app/select/option/select-option-feeder.component';

@Component({
	selector: 'fake-select-feeder',
	templateUrl: './fake-select-feeder.component.html',
})
/**
 * Component that manage the possibility to search in the options of a select.
 */
export class FakeSelectFeeder extends AbstractSelectOptionFeederComponent<any> {

	private options = [];

	constructor() {
		super();
		setTimeout(() => {


			this.options = [
				{ id: 1, name: 'red' },
				{ id: 2, name: 'green' },
				{ id: 3, name: 'yellow' },
				{ id: 4, name: 'blue' },
			];
			this.emit(null);
		}, 2000);
	}

}

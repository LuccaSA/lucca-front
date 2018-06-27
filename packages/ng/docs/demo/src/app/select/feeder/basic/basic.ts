import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
@Component({
	selector: 'basic-feeder-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFeederSelectComponent implements OnInit {
	itemSelect = { id: 1, name: 'option 1' };
	itemSelectMultiple = [{ id: 1, name: 'option 1' }];

	ngOnInit(): void {}
}

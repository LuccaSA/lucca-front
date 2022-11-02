import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ILuTree } from '@lucca-front/ng/core';
import { BehaviorSubject } from 'rxjs';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';

@Component({
	selector: 'lu-tree-option-feeder',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuTreeOptionFeederComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionFeederComponent<T> implements ILuTreeOptionOperator<T> {
	outOptions$ = new BehaviorSubject<ILuTree<T>[]>([]);
	@Input() set options(options: ILuTree<T>[]) {
		this.outOptions$.next(options);
	}
}

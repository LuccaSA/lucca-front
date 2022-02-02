import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
	ILuTreeOptionOperator,
	ALuTreeOptionOperator,
} from '../tree-option-operator.model';
import { ILuTree } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-tree-option-feeder',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuTreeOptionFeederComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionFeederComponent<T = any>
	implements ILuTreeOptionOperator<T>
{
	outOptions$ = new BehaviorSubject<ILuTree<T>[]>([]);
	@Input() set options(options: ILuTree<T>[]) {
		this.outOptions$.next(options);
	}
}

import { ChangeDetectionStrategy, Component, forwardRef, Input, Optional, SkipSelf, Inject, Self } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ALuDepartmentFeederService, ILuDepartmentFeederService } from './department-feeder.model';
import { LuDepartmentFeederService } from './department-feeder.service';
import { ALuTreeOptionOperator, ILuTreeOptionOperator, ILuTree } from '../../../tree/index';
import { ILuDepartment } from '../../department.model';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '../../../option/index';

@Component({
	selector: 'lu-department-feeder',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
		{
			provide: ALuDepartmentFeederService,
			useClass: LuDepartmentFeederService,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
	],
})
export class LuDepartmentFeederComponent extends ALuTreeOptionOperator<ILuDepartment>
implements ILuTreeOptionOperator<ILuDepartment>, ILuOnOpenSubscriber {
	outOptions$: Observable<ILuTree<ILuDepartment>[]>;
	protected _out$ = new Subject<ILuTree<ILuDepartment>[]>();
	protected _service: ILuDepartmentFeederService;
	constructor(
		@Inject(ALuDepartmentFeederService) @Optional() @SkipSelf() hostService: ILuDepartmentFeederService,
		@Inject(ALuDepartmentFeederService) @Self() selfService: ILuDepartmentFeederService,
	) {
		super();
		this._service = hostService || selfService;
		this.outOptions$ = this._out$.asObservable();
	}
	onOpen() {
		this._service.getTrees().subscribe(trees => this._out$.next(trees));
	}
}

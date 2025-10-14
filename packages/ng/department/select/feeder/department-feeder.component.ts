import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber, ILuTree } from '@lucca-front/ng/core';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '@lucca-front/ng/option';
import { Observable, Subject } from 'rxjs';
import { ILuDepartment } from '../../department.model';
import { ALuDepartmentService, LuDepartmentV4Service } from '../../service/index';

/**
 * @deprecated
 */
@Component({
	selector: 'lu-department-feeder',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
		{
			provide: ALuDepartmentService,
			useClass: LuDepartmentV4Service,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
	],
})
export class LuDepartmentFeederComponent extends ALuTreeOptionOperator<ILuDepartment> implements ILuTreeOptionOperator<ILuDepartment>, ILuOnOpenSubscriber {
	inOptions$: Observable<ILuTree<ILuDepartment>[]>;
	outOptions$: Observable<ILuTree<ILuDepartment>[]>;
	protected _out$ = new Subject<ILuTree<ILuDepartment>[]>();
	protected _service: LuDepartmentV4Service;
	@Input() set appInstanceId(appInstanceId: number | string) {
		this._service.appInstanceId = appInstanceId;
	}
	@Input() set operations(operations: number[]) {
		this._service.operations = operations;
	}

	@Input() set filters(filters: string[]) {
		this._service.filters = filters ?? [];
	}

	@Input() set uniqueOperation(uniqueOperation: number) {
		this._service.uniqueOperation = uniqueOperation;
	}

	constructor(
		@Inject(ALuDepartmentService)
		@Optional()
		@SkipSelf()
		hostService: LuDepartmentV4Service,
		@Inject(ALuDepartmentService) @Self() selfService: LuDepartmentV4Service,
	) {
		super();
		this._service = hostService || selfService;
		this.outOptions$ = this._out$.asObservable();
	}
	onOpen() {
		this._service.getTrees().subscribe((trees) => this._out$.next(trees));
	}
}

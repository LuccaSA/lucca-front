import { ILuTree } from '@lucca-front/ng/core';
import { ILuDepartment } from '../department.model';
import { Observable } from 'rxjs';
import { ILuApiService, ALuApiService } from '@lucca-front/ng/api';

export interface ILuDepartmentService<D extends ILuDepartment = ILuDepartment>
	extends ILuApiService<D> {
	getTrees(): Observable<ILuTree<D>[]>;
}
export abstract class ALuDepartmentService<
		D extends ILuDepartment = ILuDepartment,
	>
	extends ALuApiService<D>
	implements ILuDepartmentService<D>
{
	abstract getTrees(): Observable<ILuTree<D>[]>;
}

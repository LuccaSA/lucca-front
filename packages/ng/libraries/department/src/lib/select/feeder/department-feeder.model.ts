import { ILuTree, ILuService, ILuParams } from '@lucca-front/ng/core';
import { ILuDepartment } from '../../department.model';
import { Observable } from 'rxjs';

export interface ILuDepartmentService<D extends ILuDepartment = ILuDepartment> extends ILuService<ILuTree<D>> {}
export abstract class ALuDepartmentService<D extends ILuDepartment = ILuDepartment> implements ILuDepartmentService<D> {
	abstract get(params: ILuParams): Observable<ILuTree<D>[]>;
}

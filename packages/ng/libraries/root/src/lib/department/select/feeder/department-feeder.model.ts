import { ILuTree } from '../../../tree/index';
import { ILuDepartment } from '../../department.model';
import { Observable } from 'rxjs';

export interface ILuDepartmentFeederService {
	getTrees(): Observable<ILuTree<ILuDepartment>[]>;
}
export abstract class ALuDepartmentFeederService implements ILuDepartmentFeederService {
	abstract getTrees(): Observable<ILuTree<ILuDepartment>[]>;
}

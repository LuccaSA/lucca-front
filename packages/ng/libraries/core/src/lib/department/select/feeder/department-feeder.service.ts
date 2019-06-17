import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ALuDepartmentFeederService, ILuDepartmentFeederService } from './department-feeder.model';
import { map } from 'rxjs/operators';
import { ILuTree } from '../../../tree/index';
import { ILuDepartment } from '../../department.model';

@Injectable()
export class LuDepartmentFeederService extends ALuDepartmentFeederService implements ILuDepartmentFeederService {
	constructor(protected _http: HttpClient) { super(); }
	getTrees() {
		return this._http.get('/api/v3/departments/tree?fields=id,name').pipe(
			map((response: any): ILuTree<ILuDepartment>[] => {
				const tree = response.data;
				return tree.children.map(c => this.format(c));
			})
		);
	}
	private format(t): ILuTree<ILuDepartment> {
		return { value: t.node, children: t.children.map(c => this.format(c)) };
	}
}

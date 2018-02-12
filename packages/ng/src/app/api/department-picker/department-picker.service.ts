import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { Observable } from 'rxjs/Observable';

export interface IDepartmentTree {
	node: IDepartment;
	children: IDepartmentTree[];
}

export interface IDepartment {
	id: number;
	name: string;
	isSelected?: boolean;
}

@Injectable()
export class DepartmentPickerService {

	private departmentApiUrl = '/api/v3/departments/tree';

	constructor(
		private http: HttpClient
	) {
	}

	public getDepartments(): Observable<IDepartmentTree> {
		return this.http.get(this.departmentApiUrl).map((result: any) => result.data);
	}
}

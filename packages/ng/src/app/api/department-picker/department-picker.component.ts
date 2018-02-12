import { Component, OnInit, Input } from '@angular/core';
import { DepartmentPickerService, IDepartmentTree } from './department-picker.service';

@Component({
	selector: 'lu-department-picker',
	templateUrl: './department-picker.component.html',
	styleUrls: ['./department-picker.component.scss']
})
export class LuDepartmentPickerComponent implements OnInit {

	public departmentsTree: IDepartmentTree;

	@Input()
	public allowMultiple: boolean;

	constructor(
		private departmentPickerService: DepartmentPickerService
	) {
		departmentPickerService.getDepartments().subscribe(res => {
			this.departmentsTree = res;
		});
	}

	ngOnInit() {
		if (this.allowMultiple == null) {
			this.allowMultiple = true;
		}
	}

}

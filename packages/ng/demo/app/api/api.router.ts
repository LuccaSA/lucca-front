import { Routes, Route } from '@angular/router';
import { DemoApiPickerComponent } from './picker/api-picker.component';
import { DemoDepartmentPickerComponent } from './department-picker/demo-department-picker.component';

export const apiRoutes: Routes = [
	{
		path: 'api', label: 'Api', children: [
			{ path: 'picker', label: 'Picker', component: DemoApiPickerComponent } as Route,
			{ path: 'department-picker', label: 'Department Picker', component: DemoDepartmentPickerComponent } as Route,
			{ path: '', redirectTo: 'picker', pathMatch: 'full' },
		]
	} as Route,
];

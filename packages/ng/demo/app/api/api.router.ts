import { Routes, Route } from '@angular/router';
import { DemoApiPickerComponent } from './picker/api-picker.component';
import { DemoTreePickerComponent } from './tree-picker/demo-tree-picker.component';

export const apiRoutes: Routes = [
	{
		path: 'api', label: 'Api', children: [
			{ path: 'picker', label: 'Picker', component: DemoApiPickerComponent } as Route,
			{ path: 'tree-picker', label: 'Tree Picker', component: DemoTreePickerComponent } as Route,
			{ path: '', redirectTo: 'picker', pathMatch: 'full' },
		]
	} as Route,
];

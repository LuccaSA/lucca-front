import { Routes, Route } from '@angular/router';
import { DemoTreePickerComponent } from './tree-picker/demo-tree-picker.component';

export const treePickerRoutes: Routes = [
	{
		path: 'tree', label: 'Api', children: [
			{ path: 'picker', label: 'Tree Picker', component: DemoTreePickerComponent } as Route,
			{ path: '', redirectTo: 'tree-picker', pathMatch: 'full' },
		]
	} as Route,
];

import { Routes, Route } from '@angular/router';
import { DemoTreePickerComponent } from './tree-picker/demo-tree-picker.component';

export const treePickerRoutes: Routes = [
	{ path: 'tree', label: 'Tree Picker', component: DemoTreePickerComponent } as Route,
];

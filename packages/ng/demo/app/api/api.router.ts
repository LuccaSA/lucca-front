import { Routes, Route } from '@angular/router';
import { DemoApiPickerComponent } from './picker/api-picker.component';

export const apiRoutes: Routes = [
	{
		path: 'api', label: 'Api', children: [
			{ path: 'picker', label: 'Picker', component: DemoApiPickerComponent } as Route,
			{ path: '', redirectTo: 'picker', pathMatch: 'full' },
		]
	} as Route,
];

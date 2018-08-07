import { Routes, Route } from '@angular/router';
import { DemoApiSelectComponent } from './select/api-select.component';

export const apiRoutes: Routes = [
	{
		path: 'api',
		label: 'Api',
		children: [
			{
				path: 'select',
				label: 'Select',
				component: DemoApiSelectComponent,
			} as Route,
			{ path: '', redirectTo: 'select', pathMatch: 'full' },
		],
	} as Route,
];

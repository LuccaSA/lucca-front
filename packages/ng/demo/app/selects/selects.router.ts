import { Routes, Route } from '@angular/router';
import { DemoSelectsComponent } from './selects.component';

export const selectsRoutes: Routes = [
	{ path: 'select', label: 'Selects', children: [
		{ path: 'select', label: 'Select', component: DemoSelectsComponent } as Route,

		{ path: '', redirectTo: 'picker', pathMatch: 'full' },
	] } as Route,
];

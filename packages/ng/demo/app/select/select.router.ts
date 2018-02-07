import { Routes, Route } from '@angular/router';
import { DemoSelectComponent } from './select.component';

export const selectRoutes: Routes = [
	{ path: 'select', label: 'Select', component: DemoSelectComponent } as Route,
];

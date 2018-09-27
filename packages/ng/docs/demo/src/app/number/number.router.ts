import { Routes, Route } from '@angular/router';
import { DemoNumberComponent } from './number.component';

export const numberRoutes: Routes = [
	{ path: 'number', label: 'Number', component: DemoNumberComponent } as Route,
];

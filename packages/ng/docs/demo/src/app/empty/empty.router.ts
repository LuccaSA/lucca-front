import { Routes, Route } from '@angular/router';
import { DemoEmptyComponent } from './empty.component';

export const emptyRoutes: Routes = [
	{ path: 'empty', label: 'Empty', component: DemoEmptyComponent } as Route,
];

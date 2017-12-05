import { Routes, Route } from '@angular/router';
import { DemoFormlyComponent } from './formly.component';

export const formlyRoutes: Routes = [
	{ path: 'formly', label: 'Formly', component: DemoFormlyComponent } as Route,
];

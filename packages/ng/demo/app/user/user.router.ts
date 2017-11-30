import { Routes, Route } from '@angular/router';
import { DemoUserDisplayComponent} from './display/user-display.component';

export const userRoutes: Routes = [
	{ path: 'user', label: 'User', children: [
		{ path: 'display', label: 'Display', component: DemoUserDisplayComponent } as Route,
		// { path: 'picker', },
		// { path: 'picture', },
		// { path: 'tile', },
		{ path: '', redirectTo: 'display', pathMatch: 'full' },
	]} as Route,
];

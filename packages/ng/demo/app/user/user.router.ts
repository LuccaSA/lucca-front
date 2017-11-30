import { Routes } from '@angular/router';
import { DemoUserDisplayComponent} from './display/user-display.component';

export const userRoutes: Routes = [
	{ path: 'user', children: [
		{ path: 'display', component: DemoUserDisplayComponent },
		// { path: 'picker', },
		// { path: 'picture', },
		// { path: 'tile', },
		{ path: '', redirectTo: 'display', pathMatch: 'full' },
	]},
];

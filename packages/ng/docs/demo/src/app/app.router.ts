import { Routes } from '@angular/router';
import { userRoutes } from './user/user.router';
// import { NavigationComponent } from './navigation/navigation.component';
// import { featuresRoutes } from './navigation/navigation.router';

export const appRoutes: Routes = [
	// { path: '', component: NavigationComponent, outlet: 'nav' },
	// { path: '', children: [...featuresRoutes] },
	{ path: '', children: [...userRoutes] },
];

import { Routes, Route } from '@angular/router';
import { DemoUserDisplayComponent} from './display/user-display.component';
import { DemoUserTileComponent} from './tile/user-tile.component';

export const userRoutes: Routes = [
	{ path: 'user', label: 'User', children: [
		{ path: 'display', label: 'Display', component: DemoUserDisplayComponent } as Route,
		{ path: 'tile', label: 'Tile', component: DemoUserTileComponent } as Route,
		// { path: 'picker', },
		// { path: 'picture', },
		// { path: 'tile', },
		{ path: '', redirectTo: 'display', pathMatch: 'full' },
	]} as Route,
];

import { Routes, Route } from '@angular/router';
import { DemoAnimationsComponent } from './animations.component';

export const animationsRoutes: Routes = [
	{
		path: 'animations',
		label: 'Animations',
		component: DemoAnimationsComponent,
	} as Route,
];

import { Routes, Route } from '@angular/router';
import { DemoAnimationComponent } from './animation';

export const animationsRoutes: Routes = [
	{
		path: 'animations',
		label: 'Animations',
		component: DemoAnimationComponent,
	} as Route,
];

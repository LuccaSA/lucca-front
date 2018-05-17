import { Routes, Route } from '@angular/router';
import { DemoPopoverComponent } from './popover.component';

export const popoverRoutes: Routes = [
	{
		path: 'popover',
		label: 'Popover',
		component: DemoPopoverComponent,
	} as Route,
];

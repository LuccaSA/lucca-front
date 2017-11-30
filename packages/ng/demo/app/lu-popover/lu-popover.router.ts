import { Routes, Route } from '@angular/router';
import { DemoPopoverComponent } from './lu-popover.component';

export const luPopoverRoutes: Routes = [
	{ path: 'popover', label: 'Popover', component: DemoPopoverComponent } as Route,
];

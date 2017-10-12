import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { dateRangePickerRoutes } from './date-range-picker/date-range-picker.router';
import { userTileRoutes } from './user-tile/user-tile.router';
import { userDisplayRoutes } from './user-display/user-display.router';
import { formlyRoutes } from './formly/formly.router';
import { emptyRoutes } from './empty/empty.router';
import { luPopoverRoutes } from './lu-popover/lu-popover.router';

export const appRoutes: Routes = [
	{ path: '', component: NavigationComponent, outlet: 'nav' },
	{ path: '', children: [
		...dateRangePickerRoutes,
		...userTileRoutes,
		...userDisplayRoutes,
		...formlyRoutes,
		...emptyRoutes,
		...luPopoverRoutes,
	] },
];

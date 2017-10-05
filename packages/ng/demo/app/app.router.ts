import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { dateRangePickerRoutes } from './date-range-picker/date-range-picker.router';
import { userTileRoutes } from './user-tile/user-tile.router';
import { userNameRoutes } from './user-name/user-name.router';

export const appRoutes: Routes = [
	{ path: '', component: NavigationComponent, outlet: 'nav' },
	{ path: '', children: [
		...dateRangePickerRoutes,
		...userTileRoutes,
		...userNameRoutes,
	] },
];

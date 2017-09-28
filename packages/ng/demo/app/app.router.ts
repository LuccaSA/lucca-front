import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { dateRangePickerRoutes } from './date-range-picker/date-range-picker.router';
import { userTileRoutes } from './user-tile/user-tile.router';
import { formlyRoutes } from './formly/formly.router';
import { notEmptyRoutes } from './not-empty/not-empty.router';

export const appRoutes: Routes = [
	{ path: '', component: NavigationComponent, outlet: 'nav' },
	{ path: '', children: [
		...dateRangePickerRoutes,
		...userTileRoutes,
		...formlyRoutes,
		...notEmptyRoutes,
	] },
];

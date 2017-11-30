import { Routes } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { dateRangePickerRoutes } from '../date-range-picker/date-range-picker.router';
import { userTileRoutes } from '../user-tile/user-tile.router';
// import { userDisplayRoutes } f.rom './user-display/user-display.router';
import { formlyRoutes } from '../formly/formly.router';
import { emptyRoutes } from '../empty/empty.router';
import { luPopoverRoutes } from '../lu-popover/lu-popover.router';
import { animationsRoutes } from '../animations/animations.router';
import { apiRoutes } from '../api/api.router';
import { userRoutes } from '../user/user.router';
export const featuresRoutes = [
	...dateRangePickerRoutes,
	// ...userTileRoutes,
	// ...userDisplayRoutes,
	...formlyRoutes,
	...emptyRoutes,
	...luPopoverRoutes,
	...animationsRoutes,
	...apiRoutes,
	...userRoutes,
];

import { Routes } from '@angular/router';
import { dateRangePickerRoutes } from '../date-range-picker/date-range-picker.router';
import { formlyRoutes } from '../formly/formly.router';
import { emptyRoutes } from '../empty/empty.router';
import { popoverRoutes } from '../popover/popover.router';
import { animationsRoutes } from '../animations/animations.router';
import { apiRoutes } from '../api/api.router';
import { userRoutes } from '../user/user.router';
import { selectsRoutes } from '../selects/selects.router';
export const featuresRoutes = [
	...dateRangePickerRoutes,
	...formlyRoutes,
	...emptyRoutes,
	...popoverRoutes,
	...animationsRoutes,
	...apiRoutes,
	...userRoutes,
	...selectsRoutes,
];

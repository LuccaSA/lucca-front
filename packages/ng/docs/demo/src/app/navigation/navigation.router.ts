import { formlyRoutes } from '../formly/formly.router';
import { popoverRoutes } from '../popover/popover.router';
import { animationsRoutes } from '../animation/animation.router';
import { apiRoutes } from '../api/api.router';
import { userRoutes } from '../user/user.router';
import { selectRoutes } from '../select/select.router';
export const featuresRoutes = [
	...formlyRoutes,
	...popoverRoutes,
	...animationsRoutes,
	...apiRoutes,
	...userRoutes,
	...selectRoutes,
];

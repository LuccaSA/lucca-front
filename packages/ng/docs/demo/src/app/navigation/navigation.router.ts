import { formlyRoutes } from '../formly/formly.router';
import { popoverRoutes } from '../popover/popover.router';
import { animationsRoutes } from '../animation/animation.router';
import { apiRoutes } from '../api/api.router';
import { userRoutes } from '../user/user.router';
import { selectRoutes } from '../select/select.router';
import { numberRoutes } from '../number/number.router';
import { tooltipRoutes } from '../tooltip/tooltip.router';
export const featuresRoutes = [
	...numberRoutes,
	...formlyRoutes,
	...popoverRoutes,
	...animationsRoutes,
	...apiRoutes,
	...userRoutes,
	...selectRoutes,
	...tooltipRoutes,
];

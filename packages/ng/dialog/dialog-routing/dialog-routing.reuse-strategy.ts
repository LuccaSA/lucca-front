import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, RouteReuseStrategy } from '@angular/router';

export function provideDialogRoutingReuseStrategy(): EnvironmentProviders {
	return makeEnvironmentProviders([{ provide: RouteReuseStrategy, useClass: LuccaDialogRoutingReuseStrategy }]);
}

export const noRouteReuseFlag = Symbol('ɵdoNotReuseComponentFlag');

export class LuccaDialogRoutingReuseStrategy extends BaseRouteReuseStrategy {
	override shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
		const base = super.shouldReuseRoute(future, current);

		if (!base) {
			return false;
		}

		// Modal should close then re-open when navigating to the same route with different parameters
		if (future.component?.[noRouteReuseFlag]) {
			const futureUrlSegments = future.url.map((s) => s.path).join('/');
			const currentUrlSegments = current.url.map((s) => s.path).join('/');
			return futureUrlSegments === currentUrlSegments;
		}

		return true;
	}
}

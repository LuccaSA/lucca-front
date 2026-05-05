import { UrlTree } from '@angular/router';
import { isNotNil } from '../misc';
import { RouterLinkParam } from './route.model';

// Check routerLinkParam is a RouterLinkParam object typed
export function isRouterLinkParam(routerLinkParam: RouterLinkParam | string | readonly string[] | UrlTree | null | undefined): routerLinkParam is RouterLinkParam {
	return isNotNil(routerLinkParam) && typeof routerLinkParam === 'object' && 'commands' in routerLinkParam;
}

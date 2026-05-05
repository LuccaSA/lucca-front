import { ActivatedRoute, Params, UrlTree } from '@angular/router';

/**
 * `RouterLinkParam` is an interface that mirrors the options you can pass to Angular `routerLink` helpers.
 * Commands refers to the link parameters array
 * https://angular.dev/api/router/RouterLink
 */
export interface RouterLinkParam {
	commands: string | readonly string[] | UrlTree | null | undefined;
	relativeTo?: ActivatedRoute | null | undefined;
	queryParams?: Params | null | undefined;
	target?: string | undefined;
	fragment?: string | undefined;
	preserveFragment?: boolean;
	skipLocationChange?: boolean;
	replaceUrl?: boolean;
}

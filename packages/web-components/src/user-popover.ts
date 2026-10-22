import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { ApplicationRef, ChangeDetectionStrategy, Component, createComponent, EnvironmentInjector, inputBinding } from '@angular/core';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { of } from 'rxjs';

/**
 * Hosts the `luUserPopover` directive on an element of the page, which cannot receive a directive otherwise.
 */
@Component({
	selector: 'lu-web-components-user-popover-host',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: LuUserPopoverDirective, inputs: ['luUserPopover'] }],
})
class UserPopoverHostComponent {}

// Users given to the page triggers, also holding the card data (`jobTitle`, `userDepartment`…)
const users = new Map<number, ILuUser>();

/**
 * Prototypes have no API: the user popover card loads the data of the user given to its trigger instead.
 */
export const userPopoverInterceptor: HttpInterceptorFn = (request, next) => {
	const id = /\/work-locations\/api\/employee-profile-card\/(\d+)$/.exec(request.url)?.[1];
	const user = id ? users.get(Number(id)) : undefined;
	return user ? of(new HttpResponse({ status: 200, body: user })) : next(request);
};

/**
 * Applies the user popover to the elements of the page with a `luUserPopover` attribute, like the directive. The user
 * is either the element's `luUserPopover` property, or the attribute value as JSON.
 */
export function activateUserPopovers(injector: EnvironmentInjector): void {
	const appRef = injector.get(ApplicationRef);
	const activated = new WeakSet<Element>();

	const activate = (element: HTMLElement) => {
		if (activated.has(element)) {
			return;
		}
		const user = (element as HTMLElement & { luUserPopover?: ILuUser }).luUserPopover ?? (JSON.parse(element.getAttribute('luUserPopover') || 'null') as ILuUser | null);
		if (!user) {
			return;
		}
		activated.add(element);
		users.set(user.id, user);
		const componentRef = createComponent(UserPopoverHostComponent, {
			environmentInjector: injector,
			hostElement: element,
			// The host content is replaced by the component's: project it back
			projectableNodes: [[...element.childNodes]],
			bindings: [inputBinding('luUserPopover', () => user)],
		});
		appRef.attachView(componentRef.hostView);
	};

	const activateWithin = (root: ParentNode) => {
		if (root instanceof HTMLElement && root.hasAttribute('luUserPopover')) {
			activate(root);
		}
		root.querySelectorAll<HTMLElement>('[luUserPopover]').forEach(activate);
	};

	const start = () => {
		activateWithin(document.body);
		new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => node instanceof HTMLElement && activateWithin(node)))).observe(document.body, {
			childList: true,
			subtree: true,
		});
	};
	if (document.readyState === 'loading') {
		// Let the page scripts set the `luUserPopover` properties first
		document.addEventListener('DOMContentLoaded', start, { once: true });
	} else {
		start();
	}
}

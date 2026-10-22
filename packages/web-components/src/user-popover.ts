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
	// Destroys the component of each activated trigger
	const activated = new Map<HTMLElement, () => void>();
	const rejected = new WeakSet<HTMLElement>();

	const activate = (element: HTMLElement) => {
		if (activated.has(element)) {
			return;
		}
		// The popover host component would take over a custom element's host, which its own component owns
		// (`lu-listbox-option` would lose its option): the directive needs a native element.
		if (element.localName.includes('-')) {
			if (!rejected.has(element)) {
				rejected.add(element);
				console.warn(`luUserPopover is not supported on <${element.localName}>: put it on a native element inside it.`, element);
			}
			return;
		}
		const user = (element as HTMLElement & { luUserPopover?: ILuUser }).luUserPopover ?? (JSON.parse(element.getAttribute('luUserPopover') || 'null') as ILuUser | null);
		if (!user) {
			return;
		}
		users.set(user.id, user);
		const content = [...element.childNodes];
		const componentRef = createComponent(UserPopoverHostComponent, {
			environmentInjector: injector,
			hostElement: element,
			// The host content is replaced by the component's: project it back
			projectableNodes: [content],
			bindings: [inputBinding('luUserPopover', () => user)],
		});
		appRef.attachView(componentRef.hostView);
		activated.set(element, () => {
			componentRef.destroy();
			// Ready to be activated again if inserted back
			element.replaceChildren(...content);
		});
	};

	// Removed triggers: checked once the mutations are done, so that a trigger moved elsewhere is kept
	const destroyRemoved = () =>
		queueMicrotask(() =>
			activated.forEach((destroy, element) => {
				if (!element.isConnected) {
					activated.delete(element);
					destroy();
				}
			}),
		);

	const activateWithin = (root: ParentNode) => {
		if (root instanceof HTMLElement && root.hasAttribute('luUserPopover')) {
			activate(root);
		}
		root.querySelectorAll<HTMLElement>('[luUserPopover]').forEach(activate);
	};

	const start = () => {
		activateWithin(document.body);
		new MutationObserver((mutations) => {
			mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => node instanceof HTMLElement && activateWithin(node)));
			if (mutations.some((mutation) => mutation.removedNodes.length > 0)) {
				destroyRemoved();
			}
		}).observe(document.body, { childList: true, subtree: true });
	};
	if (document.readyState === 'loading') {
		// Let the page scripts set the `luUserPopover` properties first
		document.addEventListener('DOMContentLoaded', start, { once: true });
	} else {
		start();
	}
}

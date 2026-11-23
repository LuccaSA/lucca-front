import { HttpInterceptorFn, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, model, numberAttribute, output } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { ɵLU_CORE_SELECT_CURRENT_USER_ID } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
import { ILuUser } from '@lucca-front/ng/user';
import { of } from 'rxjs';

/**
 * A user of the prototype, with the department shown to tell homonyms apart.
 */
export interface ImpersonationUser extends ILuUser {
	department?: { name: string };
}

// Users given to the page `lu-impersonation` elements, served by `impersonationInterceptor`
let users: readonly ImpersonationUser[] = [];

/**
 * `lu-impersonation` loads its users from the users API, and its current user from a token: prototypes have no API,
 * so this wrapper takes them as `users` and `currentUserId`, and renders the real component.
 */
@Component({
	selector: 'lu-web-components-impersonation',
	imports: [ImpersonationComponent],
	// Angular Elements creates the template before setting the inputs: the condition, evaluated once they are set, delays
	// the component injecting `currentUserId`
	template: `
		@if (users()) {
			<lu-impersonation [(selectedUser)]="selectedUser" [enableFormerEmployees]="enableFormerEmployees()" (clear)="clear.emit()" />
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		style: 'display: contents',
	},
	providers: [{ provide: ɵLU_CORE_SELECT_CURRENT_USER_ID, useFactory: () => inject(ImpersonationElementComponent).currentUserId() }],
})
export class ImpersonationElementComponent {
	/**
	 * Users to choose from, served in place of the users API
	 */
	readonly users = input.required<readonly ImpersonationUser[]>();

	/**
	 * Id of the connected user, shown first as "me"
	 */
	readonly currentUserId = input.required({ transform: numberAttribute });

	/**
	 * Impersonated user, the connected user by default
	 */
	readonly selectedUser = model<ILuUser>();

	/**
	 * Shows the toggle including former employees
	 */
	readonly enableFormerEmployees = input(false, { transform: luBooleanAttribute });

	/**
	 * Emitted when the clear button is clicked, to stop the impersonation
	 */
	readonly clear = output<void>();

	constructor() {
		effect(() => {
			users = this.users();
			if (!this.selectedUser()) {
				this.selectedUser.set(users.find(({ id }) => id === this.currentUserId()));
			}
		});
	}
}

const normalize = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

/**
 * Users matching a search `clue`: each of its words starts the first or last name of the user, as in the users API.
 */
function matchesClue(user: ImpersonationUser, clue: string): boolean {
	const names = normalize(`${user.firstName} ${user.lastName}`).split(/[\s-]+/);
	return normalize(clue)
		.split(/[\s,]+/)
		.filter(Boolean)
		.every((word) => names.some((name) => name.startsWith(word)));
}

function search(params: HttpParams): object {
	const ids = params.get('id')?.split(',').map(Number);
	const clue = params.get('clue');
	const found = users.filter((user) => (!ids || ids.includes(user.id)) && (!clue || matchesClue(user, clue)));

	if (params.get('fields') === 'collection.count') {
		return { data: { count: found.length } };
	}
	const [offset, limit] = (params.get('paging') ?? `0,${found.length}`).split(',').map(Number);
	return { data: { items: found.slice(offset, offset + limit).map((item) => ({ item })) } };
}

/**
 * Prototypes have no API: the users API answers with the users given to `lu-impersonation`. Covers the search of the
 * select ("me" included) and the lookup of the departments of homonyms.
 */
export const impersonationInterceptor: HttpInterceptorFn = (request, next) => {
	if (users.length === 0 || request.method !== 'GET') {
		return next(request);
	}
	if (request.url === '/api/v3/users/search' || request.url === '/api/v3/users/scopedsearch') {
		return of(new HttpResponse({ status: 200, body: search(request.params) }));
	}
	if (request.url === '/api/v3/users') {
		const ids = request.params.get('id')?.split(',').map(Number) ?? [];
		const items = users.filter(({ id }) => ids.includes(id)).map(({ id, department }) => ({ id, department }));
		return of(new HttpResponse({ status: 200, body: { data: { items } } }));
	}
	return next(request);
};

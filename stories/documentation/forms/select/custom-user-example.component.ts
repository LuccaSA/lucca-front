import { Directive } from '@angular/core';
import { LuCoreSelectUser, LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LuCustomUser extends LuCoreSelectUser {
	myCustomProperty: number;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[customUsers],lu-multi-select[customUsers]',
	standalone: true,
	exportAs: 'luCustomUsers',
})
export class LuCoreSelectCustomUsersDirective extends LuCoreSelectUsersDirective<LuCustomUser> {
	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<LuCustomUser[]> {
		return super.getOptions(params, page).pipe(
			map((options) =>
				options.map((option) => ({
					...option,
					myCustomProperty: Math.floor(Math.random() * 100),
				})),
			),
		);
	}

	protected override getMe(): Observable<LuCustomUser> {
		return super.getMe().pipe(
			map((me) => ({
				...me,
				myCustomProperty: 666,
			})),
		);
	}
}

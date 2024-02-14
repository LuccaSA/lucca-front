import { Directive } from '@angular/core';
import { LuCoreSelectEstablishment, LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/etablishment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LuCustomEstablishment extends LuCoreSelectEstablishment {
	myCustomProperty: number;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[customEstablishments],lu-multi-select[customEstablishments]',
	standalone: true,
	exportAs: 'luCustomEstablishments',
})
export class LuCoreSelectCustomEstablishmentsDirective extends LuCoreSelectEstablishmentsDirective<LuCustomEstablishment> {
	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<LuCustomEstablishment[]> {
		return super.getOptions(params, page).pipe(
			map((options) =>
				options.map((option) => ({
					...option,
					myCustomProperty: Math.floor(Math.random() * 100),
				})),
			),
		);
	}
}

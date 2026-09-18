import { Directive } from '@angular/core';
import { ALuCoreSelectApiDirective, LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select';
import { NEVER, Observable, of } from 'rxjs';

@Directive({ selector: 'lu-multi-select[myOptions]' })
export class MyOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	public readonly totalCount$ = NEVER;

	protected optionKey = (option: MyOption) => option.id;

	protected getOptions(): Observable<MyOption[]> {
		return of([]);
	}
}

@Directive({ selector: 'lu-multi-select[myStaticOptions]' })
export class MyStaticOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	totalCount$ = NEVER;
}

@Directive({ selector: 'lu-multi-select[myCountedOptions]' })
export class MyCountedOptionsDirective extends LuCoreSelectApiV4Directive<MyOption> {
	public get totalCount$(): Observable<number> {
		return of(42);
	}
}

@Directive({ selector: 'lu-multi-select[myOtherOptions]' })
export class MyOtherOptionsDirective extends MyOptionsDirective {
	public override readonly totalCount$ = of(0);
}

@Directive({ selector: 'lu-multi-select[myUncountedOptions]' })
export class MyUncountedOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	protected optionKey = (option: MyOption) => option.id;
}

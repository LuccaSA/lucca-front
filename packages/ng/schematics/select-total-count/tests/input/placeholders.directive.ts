import { Directive, forwardRef } from '@angular/core';
import { ALuCoreSelectApiDirective, CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { map, NEVER, Observable } from 'rxjs';

/** Placeholder: nothing provides the token, nothing reads the member. */
@Directive({ selector: 'lu-multi-select[myPlaceholderOptions]' })
export class MyPlaceholderOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	public readonly totalCount$ = NEVER;
}

/** Exposed as the count provider: the select-all reads it, it has to stay. */
@Directive({
	selector: 'lu-multi-select[myProvidedOptions]',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => MyProvidedOptionsDirective),
		},
	],
})
export class MyProvidedOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	public readonly totalCount$ = NEVER;
}

/** Real count: not a placeholder. */
@Directive({ selector: 'lu-multi-select[myRealCountOptions]' })
export class MyRealCountOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	public readonly totalCount$ = this.httpClient.get<{ count: number }>('/api/options').pipe(map((res) => res.count));
}

/** Placeholder initializer, but the directive reads it itself. */
@Directive({ selector: 'lu-multi-select[myReadOptions]' })
export class MyReadOptionsDirective extends ALuCoreSelectApiDirective<MyOption> {
	public readonly totalCount$ = NEVER;

	public countLabel(): Observable<string> {
		return this.totalCount$.pipe(map((count) => `${count} options`));
	}
}

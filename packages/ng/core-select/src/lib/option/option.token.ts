import { InjectionToken, Provider } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ILuOptionContext<T> {
	isDisabled$: BehaviorSubject<boolean>;
	option$: BehaviorSubject<T | undefined>;
	destroy(): void;
}

export const LU_OPTION_CONTEXT = new InjectionToken<ILuOptionContext<unknown>>('LuOptionContext');

function optionContextFactory<T>(): ILuOptionContext<T> {
	const isDisabled$ = new BehaviorSubject(false);
	const option$ = new BehaviorSubject<T | undefined>(undefined);
	return {
		isDisabled$,
		option$,
		destroy(): void {
			isDisabled$.complete();
			option$.complete();
		},
	};
}

export function provideOptionContext(): Provider {
	return {
		provide: LU_OPTION_CONTEXT,
		useFactory: optionContextFactory,
	};
}

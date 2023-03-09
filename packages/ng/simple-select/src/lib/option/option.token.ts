import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ILuOptionContext<T> {
	isDisabled$: BehaviorSubject<boolean>;
	option$: BehaviorSubject<T | undefined>;
}

export const LU_OPTION_CONTEXT = new InjectionToken<ILuOptionContext<unknown>>('LuOptionContext');

export function optionContextFactory<T>(): ILuOptionContext<T> {
	return {
		isDisabled$: new BehaviorSubject(false),
		option$: new BehaviorSubject<T | undefined>(undefined),
	};
}

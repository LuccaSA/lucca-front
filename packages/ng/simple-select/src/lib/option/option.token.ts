import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface ILuOptionContext {
	isDisabled$: Subject<boolean>;
}

export const LU_OPTION_CONTEXT = new InjectionToken<ILuOptionContext>('LuOptionContext');

export const optionContextFactory = (): ILuOptionContext => ({ isDisabled$: new BehaviorSubject(false) });

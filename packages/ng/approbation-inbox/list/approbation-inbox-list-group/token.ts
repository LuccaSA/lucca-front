import { InjectionToken, Signal } from '@angular/core';

export interface ApprobationInboxGroupInstance {
	readonly expanded: Signal<boolean>;
}

export const APPROBATION_INBOX_LIST_GROUP_INSTANCE = new InjectionToken<ApprobationInboxGroupInstance>('APPROBATION_INBOX_LIST_GROUP_INSTANCE');

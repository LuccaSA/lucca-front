import { InjectionToken, Signal } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';

export const FILTER_PILL_INPUT_COMPONENT = new InjectionToken<FilterPillInputComponent>('FilterPills:InputComponent');

export interface FilterPillInputComponent {
	isFilterPillEmpty: Signal<boolean>;
	enableFilterPillMode?: () => void;
	onFilterPillClosed?: () => void;
	getDefaultFilterPillIcon?: () => LuccaIcon;
}

import { Signal } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';

export interface FilterPillInputComponent {
	isFilterPillEmpty: Signal<boolean>;

	clearFilterPillValue(): void;

	registerFilterPillClosePopover(closeFn: () => void): void;

	registerFilterPillUpdatePosition?(updateFn: () => void): void;

	hideCombobox?: Signal<boolean>;
	showColon?: Signal<boolean>;

	enableFilterPillMode?(): void;

	onFilterPillClosed?(): void;

	getDefaultFilterPillIcon?(): LuccaIcon;
}

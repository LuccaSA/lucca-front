import { Signal } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';

export type FilterPillLayout = 'checkable';

export interface FilterPillInputComponent {
	isFilterPillEmpty: Signal<boolean>;
	// If this is not here, we'll consider it's using default layout
	filterPillLayout?: Signal<FilterPillLayout>;
	hideCombobox?: Signal<boolean>;
	showColon?: Signal<boolean>;

	filterPillDisabled?: Signal<boolean>;

	clearFilterPillValue(): void;

	registerFilterPillClosePopover(closeFn: () => void): void;

	registerFilterPillUpdatePosition?(updateFn: () => void): void;

	enableFilterPillMode?(): void;

	onFilterPillClosed?(): void;

	onFilterPillOpened?(): void;

	onFilterPillClick?(): void;

	getDefaultFilterPillIcon?(): LuccaIcon;
}

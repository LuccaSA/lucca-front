import { LuSelectPanelRef } from '@lucca-front/ng/core-select';

export abstract class LuMultiSelectPanelRef<T> extends LuSelectPanelRef<T, T[]> {
	abstract updateSelectedOptions(selectedOptions: T[]): void;

	abstract useDefaultPosition(): void;
}

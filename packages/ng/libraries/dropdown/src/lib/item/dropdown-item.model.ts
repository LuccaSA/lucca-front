export interface ILuDropdownItem {
	focus(): void;
}
export abstract class ALuDropdownItem implements ILuDropdownItem {
	abstract focus(): void;
}
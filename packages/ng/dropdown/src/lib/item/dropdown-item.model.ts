import { Observable } from 'rxjs';

export interface ILuDropdownItem {
	onSelect: Observable<boolean>;
	focus(): void;
}
export abstract class ALuDropdownItem implements ILuDropdownItem {
	abstract onSelect: Observable<boolean>;
	abstract focus(): void;
}

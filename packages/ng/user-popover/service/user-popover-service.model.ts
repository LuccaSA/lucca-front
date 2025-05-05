import { Observable } from 'rxjs';
import { LuUserPopover } from '../user-popover.model';

export interface ILuUserPopoverStore {
	get(id: number): Observable<LuUserPopover>;
	clearCache(userId?: number): void;
}

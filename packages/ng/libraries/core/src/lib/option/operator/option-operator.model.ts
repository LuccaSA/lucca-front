import { Observable } from 'rxjs';

export interface ILuOptionOperator<T = any> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
	onScrollBottom?: () => void;
	onKeydown?: (key: number) => void;
	onOpen?: () => void;
	onClose?: () => void;
}
export abstract class ALuOptionOperator<T = any> implements ILuOptionOperator<T> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}

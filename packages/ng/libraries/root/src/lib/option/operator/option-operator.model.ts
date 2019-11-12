import { Observable } from 'rxjs';

export interface ILuOptionOperator<T = any> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}
export abstract class ALuOptionOperator<T = any> implements ILuOptionOperator<T> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}
export interface ILuOnOpenSubscriber {
	onOpen(): void;
}
export abstract class ALuOnOpenSubscriber implements ILuOnOpenSubscriber {
	abstract onOpen(): void;
}
export interface ILuOnCloseSubscriber {
	onClose(): void;
}
export abstract class ALuOnCloseSubscriber implements ILuOnCloseSubscriber {
	abstract onClose(): void;
}
export interface ILuOnScrollBottomSubscriber {
	onScrollBottom(): void;
}
export abstract class ALuOnScrollBottomSubscriber implements ILuOnScrollBottomSubscriber {
	abstract onScrollBottom(): void;
}

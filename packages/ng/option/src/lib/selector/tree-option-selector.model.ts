import { ALuOptionSelector, ILuOptionSelector } from './option-selector.model';

export type ILuTreeOptionSelector<T> = ILuOptionSelector<T>;
export abstract class ALuTreeOptionSelector<T>
	extends ALuOptionSelector<T>
	implements ILuTreeOptionSelector<T> {}

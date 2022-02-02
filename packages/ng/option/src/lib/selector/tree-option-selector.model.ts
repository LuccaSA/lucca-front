import { ILuOptionSelector, ALuOptionSelector } from './option-selector.model';

export type ILuTreeOptionSelector<T = any> = ILuOptionSelector;
export abstract class ALuTreeOptionSelector<T = any>
	extends ALuOptionSelector
	implements ILuTreeOptionSelector<T> {}

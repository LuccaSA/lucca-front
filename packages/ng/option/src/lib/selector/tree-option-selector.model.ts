import { ILuOptionSelector, ALuOptionSelector } from './option-selector.model';

export interface ILuTreeOptionSelector<T = any> extends ILuOptionSelector {}
export abstract class ALuTreeOptionSelector<T = any> extends ALuOptionSelector implements ILuTreeOptionSelector<T> {}

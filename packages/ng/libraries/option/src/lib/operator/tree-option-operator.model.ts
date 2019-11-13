import { ILuOptionOperator, ALuOptionOperator } from './option-operator.model';
import { ILuTree } from '@lucca-front/ng/core';

export interface ILuTreeOptionOperator<T> extends ILuOptionOperator<ILuTree<T>> {}

export abstract class ALuTreeOptionOperator<T> extends ALuOptionOperator<ILuTree<T>> implements ILuTreeOptionOperator<T> {}

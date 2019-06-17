import { ILuOptionOperator } from '../../../option/index';
import { ILuTree } from '../../tree.model';

export interface ILuTreeOptionOperator<T> extends ILuOptionOperator<ILuTree<T>> {}

export abstract class ALuTreeOptionOperator<T> implements ILuTreeOptionOperator<T> {}

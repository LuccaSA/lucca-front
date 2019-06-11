export interface ILuTree<T = any> {
	value: T;
	children: ILuTree<T>[]
}

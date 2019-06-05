export interface ILuTree<T = any> {
	node: T;
	children: ILuTree<T>[]
}

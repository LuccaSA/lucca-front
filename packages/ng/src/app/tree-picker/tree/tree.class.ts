export interface ITree {
	node: ITreeNode;
	children: ITree[];
}

export interface ITreeNode {
	id: number;
	name: string;
	isSelected?: boolean;
}

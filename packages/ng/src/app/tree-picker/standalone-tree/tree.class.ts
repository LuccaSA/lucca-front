export interface ITree {
	node: ITreeNode;
	children: ITree[];
}

export interface ITreeNode {
	id: number;
	name: string;
	isSelected?: boolean;
}

export class Tree implements ITree {
	public readonly node: TreeNode;
	public readonly children: Tree[];

	public constructor(baseTree: ITree | null) {
		if (baseTree == null) {
			this.node = new TreeNode(null);
			this.children = new Array<Tree>();
			return;
		}
		this.node = new TreeNode(baseTree.node);
		this.children = new Array<Tree>();
		for (const child of baseTree.children) {
			this.children.push(new Tree(child));
		}
	}

	/** Traverses the given N-ary tree in a non-recursive way.
	 * For each node, this method will call the callback given in parameters.
	 * The callback must return a boolean to know if the tree traversal should stop.
	 * Returns the total number of nodes visited. */
	public traverse(nodeOperation: (tree: Tree) => boolean): number {
		let numberOfNodesVisited = 0;
		let currentDepthTrees: Tree[] = this.children || new Array<Tree>();
		let shouldStopTraversing = false;
		while (currentDepthTrees.length > 0 && !shouldStopTraversing) {
			const nextDepthTrees = new Array<Tree>();
			numberOfNodesVisited += currentDepthTrees.length;
			for (let i = 0; i < currentDepthTrees.length && !shouldStopTraversing; ++i) {
				shouldStopTraversing = nodeOperation(currentDepthTrees[i]);
				if (currentDepthTrees[i].children !== null) {
					nextDepthTrees.push(...currentDepthTrees[i].children);
				}
			}
			currentDepthTrees = nextDepthTrees;
		}
		return numberOfNodesVisited;
	}
}

export class TreeNode implements ITreeNode {
	public readonly id: number;
	public readonly name: string;
	public isSelected: boolean;

	public constructor(baseNode: ITreeNode | null) {
		if (baseNode == null) {
			this.id = 0;
			this.name = '0';
		} else {
			this.id = baseNode.id;
			this.name = baseNode.name;
		}
		this.isSelected = false;
	}
}

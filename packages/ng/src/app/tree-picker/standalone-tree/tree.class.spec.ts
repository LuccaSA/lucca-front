import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Tree, ITree, ITreeNode, TreeNode } from './tree.class';

describe('Tree', () => {

	const tree = new Tree(<ITree>{
		node: null,
		children: [
			<ITree>{
				node: <ITreeNode>{ id: 1, name: '1' },
				children: [
					<ITree>{
						node: <ITreeNode>{ id: 2, name: '2' },
						children: [
							<ITree>{
								node: <ITreeNode>{ id: 3, name: '3' },
								children: []
							},
							<ITree>{
								node: <ITreeNode>{ id: 4, name: '4' },
								children: []
							},
						]
					},
					<ITree>{
						node: <ITreeNode>{ id: 5, name: '5' },
						children: []
					},
					<ITree>{
						node: <ITreeNode>{ id: 6, name: '6' },
						children: []
					},
					<ITree>{
						node: <ITreeNode>{ id: 7, name: '7' },
						children: []
					},
				]
			},
			<ITree>{
				node: <ITreeNode>{ id: 8, name: '8' },
				children: [
					<ITree>{
						node: <ITreeNode>{ id: 9, name: '9' },
						children: []
					},
				]
			}
		]
	})

	it('should traverse all the tree', () => {
		const visitedNodesIds = new Array<number>();
		tree.traverse((current: Tree) => {
			visitedNodesIds.push(current.node.id);
			return false;
		});

		for (let i = 1; i <= 9; ++i) {
			expect(visitedNodesIds.indexOf(i)).not.toBe(-1);
		}
	});
});

import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from './model';
import { TreeGenerator } from './tree-generator';

@Pipe({
	name: 'luTreeDisplay',
	pure: true,
})
export class TreeDisplayPipe<T> implements PipeTransform {
	transform(items: T[], treeGenerator: TreeGenerator<T, TreeNode<T>>): TreeNode<T>[] {
		return treeGenerator.generateTrees(items);
	}
}

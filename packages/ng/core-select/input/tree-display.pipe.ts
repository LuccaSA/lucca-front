import { Pipe, PipeTransform } from '@angular/core';
import { TreeGenerator } from './tree-generator';
import { TreeNode } from './model';

@Pipe({
	name: 'luTreeDisplay',
	pure: true,
})
export class TreeDisplayPipe<T> implements PipeTransform {
	transform(items: T[], treeGenerator: TreeGenerator<T, TreeNode<T>>): TreeNode<T>[] {
		return treeGenerator.generateTrees(items);
	}
}

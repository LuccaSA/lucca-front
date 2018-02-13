import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ITree, ITreeNode } from './tree-picker.class';
import { Observable } from 'rxjs/Observable';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'lu-tree-picker',
	templateUrl: './tree-picker.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuTreePickerComponent), multi: true },
	],
	styleUrls: ['./tree-picker.component.scss'],
})
export class LuTreePickerComponent implements ControlValueAccessor, OnInit, OnChanges {

	@Input()
	public sourceTree: ITree;
	@Input()
	public allowMultiple: boolean;

	public scopeTree: ITree;

	private _innerValue: ITreeNode[];
	private get value(): ITreeNode[] { return this._innerValue; }
	private set value(value: ITreeNode[]) {
		if (value === this._innerValue) {
			return;
		}
		this._innerValue = value;
		this.onChangeCallback(this._innerValue);
	}

	constructor() { }

	public writeValue(value: ITreeNode[]): void {
		this.value = value;
		// Find which nodes should be selected
		this.traverse(this.scopeTree, current => {
			current.node.isSelected =
				this.value != null && this.value.find(v => v.id === current.node.id) != null;
			return true;
		});
	}

	public onChangeCallback: (_: any) => void = () => { };
	public registerOnChange(methodToCall: (_: any) => void): void {
		this.onChangeCallback = methodToCall;
	}

	private onTouchedCallback: (_: any) => void = () => { };
	public registerOnTouched(methodToCall: (_: any) => void): void {
		this.onTouchedCallback = methodToCall;
	}

	public ngOnInit(): void {
		if (this.allowMultiple == null) {
			this.allowMultiple = true;
		}
	}

	// OnChanges
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.hasOwnProperty('sourceTree')) {
			this.fillTree(changes.sourceTree.currentValue);
			this.value = this.getCheckedNodes(this.scopeTree);
		}
	}

	public onNodeChanged(node: ITreeNode) {
		if (node == null) {
			return;
		}
		if (node.isSelected) {
			const nodeToAdd = Object.assign({}, node);
			delete nodeToAdd.isSelected;
			this.value.push(nodeToAdd);
		} else {
			const indexToRemove = this.value.findIndex(v => v.id === node.id);
			this.value.splice(indexToRemove, 1);
		}
		this.onChangeCallback(this.value);
	}

	/** Returns all the checked nodes in the given tree */
	private getCheckedNodes(tree: ITree): ITreeNode[] {
		const result = new Array<ITreeNode>();
		this.traverse(tree, (current: ITree) => {
			if (current.node.isSelected) {
				result.push(current.node);
			}
			return true;
		});
		return result;
	}

	/** Traverses the given N-ary tree in a non-recursive way.
	 * For each node, this method will call the callback given in parameters.
	 * The callback must return a boolean to know if the tree traversal should continue.
	 * Returns the total number of nodes visited. */
	private traverse(tree: ITree, nodeOperation: (ITree) => boolean): number {
		let result = 0;
		let currentDepthTrees: ITree[] = tree.children || new Array<ITree>();
		let shouldContinue = true;

		while (currentDepthTrees.length > 0 && shouldContinue) {
			const nextDepthTrees = new Array<ITree>();
			result += currentDepthTrees.length;
			for (let i = 0; i < currentDepthTrees.length && shouldContinue; ++i) {
				shouldContinue = nodeOperation(currentDepthTrees[i]);
				if (currentDepthTrees[i].children !== null) {
					nextDepthTrees.push(...currentDepthTrees[i].children);
				}
			}
			currentDepthTrees = nextDepthTrees;
		}
		return result;
	}

	private fillTree(source: ITree): void {
		if (source == null) {
			this.scopeTree = <ITree>{ node: null, children: [] };
			return;
		}

		// Copy the source tree and delete the `isSelected` property for each node
		this.scopeTree = Object.assign({}, source);
		this.traverse(this.scopeTree, current => delete current.node.isSelected);
	}
}


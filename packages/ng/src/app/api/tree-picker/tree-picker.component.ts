import { Component, Input, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ITree, ITreeNode } from './tree-picker.class';
import { TreePickerMessageService, TreePickerMessage } from './tree-picker.message.service';

@Component({
	selector: 'lu-tree-picker',
	templateUrl: './tree-picker.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuTreePickerComponent), multi: true },
	],
	styleUrls: ['./tree-picker.component.scss'],
})
export class LuTreePickerComponent implements ControlValueAccessor, OnInit, OnChanges {

	/** Default value for 'multiple' attribute */
	public static readonly DEFAULT_ALLOW_MULTIPLE = true;

	@Input()
	public sourceTree: ITree;
	@Input()
	public multiple: boolean;

	private _innerValue: ITreeNode[] | ITreeNode;
	private get value(): ITreeNode[] | ITreeNode { return this._innerValue; }
	/** _innerValue casted to ITreeNode[]  */
	private get multipleValue(): ITreeNode[] { return <ITreeNode[]>this._innerValue; }
	/** _innerValue casted to ITreeNode  */
	private get singleValue(): ITreeNode { return <ITreeNode>this._innerValue; }
	private set value(value: ITreeNode[] | ITreeNode) {
		if (value === this._innerValue) {
			return;
		}
		this._innerValue = value;
		this.onChangeCallback(this._innerValue);
	}

	public scopeTree: ITree;
	public readonly messenger: TreePickerMessageService;

	constructor() {
		this.messenger = new TreePickerMessageService();
		this.messenger.onNodeChanged().subscribe(message => this.onNodeChanged(message));
	}

	public writeValue(value: ITreeNode[]): void {
		this.value = value;
		// Find which nodes should be selected
		this.traverse(this.scopeTree, current => {
			if (this.multiple) {
				current.node.isSelected = this.value != null && this.multipleValue.find(v => v.id === current.node.id) != null;
			} else {
				current.node.isSelected = this.value != null && current.node.id === this.singleValue.id;
			}
			// If selected and multivalue not allowed, stop traversing the tree
			return current.node.isSelected && !this.multiple;
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

	public ngOnInit() {
		if (this.multiple == null) {
			this.multiple = LuTreePickerComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (this._innerValue == null) {
			this._innerValue = <ITreeNode | ITreeNode[]>(this.multiple ? {} : []);
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.multiple == null) {
			this.multiple = LuTreePickerComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (changes.hasOwnProperty('sourceTree')) {
			this.fillTree(changes.sourceTree.currentValue);
			this.value = this.getCheckedNodes(this.scopeTree);
		}
	}

	public onNodeChanged(message: TreePickerMessage) {
		if (message == null || message.node == null) {
			return;
		}
		// Multiple
		if (this.multiple) {
			if (message.node.isSelected) {
				const nodeToAdd = this.deepClone(message.node);
				delete nodeToAdd.isSelected;
				this.multipleValue.push(nodeToAdd);
			} else {
				const indexToRemove = this.multipleValue.findIndex(v => v.id === message.node.id);
				this.multipleValue.splice(indexToRemove, 1);
			}
			// Value reference did not change: call onChangeCallback() manually
			this.onChangeCallback(this.value);
			return;
		}
		// Single
		if (message.node.isSelected) {
			const nodeToAdd = this.deepClone(message.node);
			delete nodeToAdd.isSelected;
			this.value = nodeToAdd;
		} else {
			this.value = undefined;
		}
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
	 * The callback must return a boolean to know if the tree traversal should stop.
	 * Returns the total number of nodes visited. */
	private traverse(tree: ITree, nodeOperation: (ITree) => boolean): number {
		let numberOfNodesVisited = 0;
		let currentDepthTrees: ITree[] = tree.children || new Array<ITree>();
		let shouldStopTraversing = false;

		while (currentDepthTrees.length > 0 && !shouldStopTraversing) {
			const nextDepthTrees = new Array<ITree>();
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

	private fillTree(source: ITree): void {
		if (source == null) {
			this.scopeTree = <ITree>{ node: null, children: [] };
			return;
		}
		// Deep clone the source tree and delete the `isSelected` property for each node
		this.scopeTree = this.deepClone(source);
		this.traverse(this.scopeTree, current => delete current.node.isSelected);
	}

	/** Creates a deep clone of the given object. See: https://stackoverflow.com/a/40294058/2456022
	 * TODO: export this method in a helper, or add Underscore / Iodash to the project dependencies
	 */
	private deepClone(target: any, hash = new WeakMap()) {
		// primitives
		if (Object(target) !== target) {
			return target;
		}
		// cyclic reference
		if (hash.has(target)) {
			return hash.get(target);
		}

		let result: any;
		if (target instanceof Date) {
			result = new Date(target);
		} else if (target instanceof RegExp) {
			result = new RegExp(target.source, target.flags);
		} else if (target.constructor) {
			result = new target.constructor();
		} else {
			result = Object.create(null);
		}

		hash.set(target, result);
		if (target instanceof Map) {
			Array.from(target, ([key, val]) => result.set(key, this.deepClone(val, hash)));
		}
		return Object.assign(result, ...Object.keys(target).map(key => ({ [key]: this.deepClone(target[key], hash) })));
	}
}

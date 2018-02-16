import { Component, Input, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Tree, ITree, TreeNode, ITreeNode } from './tree.class';
import { TreePickerMessageService, TreePickerMessage } from './tree.message.service';

@Component({
	selector: 'lu-tree',
	templateUrl: './tree.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuTreeComponent), multi: true },
	],
	styleUrls: ['./tree.component.scss'],
})
export class LuTreeComponent implements ControlValueAccessor, OnInit, OnChanges {

	/** Default value for 'multiple' attribute */
	public static readonly DEFAULT_ALLOW_MULTIPLE = true;

	/** The tree to display */
	@Input()
	public sourceTree: ITree;
	/** Allow selection of multiple node or not */
	@Input()
	public multiple: boolean;

	private _innerValue: ITreeNode[] | ITreeNode;
	private get value(): ITreeNode[] | ITreeNode { return this._innerValue; }
	private get multipleValue(): ITreeNode[] { return <ITreeNode[]>this._innerValue; }
	private get singleValue(): ITreeNode { return <ITreeNode>this._innerValue; }
	private set value(value: ITreeNode[] | ITreeNode) {
		if (value === this._innerValue) {
			return;
		}
		this._innerValue = value;
		this.onChangeCallback(this._innerValue);
	}

	public scopeTree: Tree;
	public readonly messenger: TreePickerMessageService;

	constructor() {
		this.messenger = new TreePickerMessageService();
		this.messenger.onNodeChanged().subscribe(message => this.onNodeChanged(message));
	}

	public writeValue(value: ITreeNode | ITreeNode[]): void {
		this.value = value;
		// Find which nodes should be selected
		this.scopeTree.traverse(current => {
			if (this.multiple) {
				current.node.isSelected = this.multipleValue != null && this.multipleValue.find(v => v.id === current.node.id) != null;
			} else {
				current.node.isSelected = this.singleValue != null && current.node.id === this.singleValue.id;
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
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (changes.hasOwnProperty('sourceTree') && this.sourceTree != null) {
			this.scopeTree = new Tree(changes.sourceTree.currentValue);
			this.value = this.getCheckedNodes(this.scopeTree);
		}
	}

	/** Called when the view value changes  */
	public onNodeChanged(message: TreePickerMessage) {
		if (message == null || message.node == null) {
			return;
		}
		// Multiple
		if (this.multiple) {
			if (message.node.isSelected) {
				const nodeToAdd = <ITreeNode>{ id: message.node.id, name: message.node.name };
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
			const nodeToAdd = <ITreeNode>{ id: message.node.id, name: message.node.name };
			delete nodeToAdd.isSelected;
			this.value = nodeToAdd;
		} else {
			this.value = undefined;
		}
	}

	/** Returns all the nodes which are checked in the given tree */
	private getCheckedNodes(tree: Tree): ITreeNode[] {
		const result = new Array<ITreeNode>();
		tree.traverse(current => {
			if (current.node.isSelected) {
				result.push(current.node);
			}
			return true;
		});
		return result;
	}
}
